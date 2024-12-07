const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 700,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'), // Sử dụng preload
			nodeIntegration: false, // Bật nodeIntegration để có thể truy cập tài nguyên từ Electron
			contextIsolation: true,
		},
	});

	win.loadURL('http://localhost:3879');
}

function translateText(text, callback) {
	const pythonScriptPath = path.join(__dirname, 'translate.py');
	const pythonProcess = spawn('python', [pythonScriptPath, text]);

	let result = '';
	pythonProcess.stdout.on('data', (data) => {
		result += data.toString();
	});

	pythonProcess.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	pythonProcess.on('close', () => {
		try {
			const parsedResult = JSON.parse(result);
			callback(parsedResult);
		} catch (err) {
			console.error('Error parsing JSON:', err);
			callback({ translated_text: 'Error translating text.' });
		}
	});
}
function generateTTS(text, voiceIndex = 0) {
	return new Promise((resolve, reject) => {
		const pythonScript = path.join(__dirname, 'speachToText.py');

		const pythonProcess = spawn('python', [
			pythonScript,
			text,
			voiceIndex,
		]);

		let result = '';
		pythonProcess.stdout.on('data', (data) => {
			result += data.toString();
		});

		pythonProcess.stderr.on('data', (data) => {
			console.error(`Python STDERR: ${data}`);
		});

		pythonProcess.on('close', (code) => {
			if (code !== 0) {
				reject(`Python script exited with code ${code}`);
				return;
			}
		});
	});
}

function runSpeakToText() {
	return new Promise((resolve, reject) => {
		const pythonProcess = spawn('python', ['speakToText.py']);

		let result = '';
		pythonProcess.stdout.on('data', (data) => {
			result += data.toString();
		});

		pythonProcess.stderr.on('data', (data) => {
			console.error(`Error: ${data.toString()}`);
		});

		pythonProcess.on('close', (code) => {
			if (code !== 0) {
				reject(`Python script exited with code ${code}`);
				return;
			}

			console.log({ result });
			resolve(result); // Trả về kết quả nhận dạng giọng nói
		});
	});
}

// Xử lý yêu cầu IPC từ frontend

// Xử lý yêu cầu từ frontend để chạy Speech-to-Text
ipcMain.handle('runSpeakToText', async (event) => {
	try {
		const text = await runSpeakToText();
		return { status: 'success', text: text }; // Trả về văn bản nhận diện được
	} catch (error) {
		console.error('Error in Speech-to-Text process:', error);
		return { status: 'error', message: error };
	}
});

ipcMain.handle('generateTTS', async (event, text, voiceIndex) => {
	try {
		const base64Audio = await generateTTS(text, voiceIndex);
		console.log('TTS generation successful, Base64 string generated.');
		return { status: 'success', audio: base64Audio }; // Trả về chuỗi Base64
	} catch (error) {
		console.error('TTS generation error:', error);
		return { status: 'error', message: error };
	}
});

ipcMain.handle('translateText', (event, text) => {
	return new Promise((resolve) => {
		translateText(text, (result) => {
			resolve(result);
		});
	});
});

ipcMain.handle('addTranslates', async (event, todo) => {
	try {
		const folderPath = path.join(__dirname, 'list_translates');
		const filePath = path.join(folderPath, 'translate.json');

		// Tạo folder nếu chưa tồn tại
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath);
		}

		let data = [];
		// Đọc file nếu file đã tồn tại
		if (fs.existsSync(filePath)) {
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			data = JSON.parse(fileContent || '[]');
		}

		// Thêm todo mới vào danh sách
		data.push(todo);
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

		return 'Todo added successfully!';
	} catch (error) {
		console.error('Error adding todo:', error);
		throw new Error('Failed to add todo!');
	}
});
ipcMain.handle('getTranslates', async (event) => {
	try {
		const folderPath = path.join(__dirname, 'list_translates');
		const filePath = path.join(folderPath, 'translate.json');

		// Kiểm tra nếu file tồn tại
		if (fs.existsSync(filePath)) {
			const fileContent = fs.readFileSync(filePath, 'utf-8');
			const data = JSON.parse(fileContent || '[]');
			return data; // Trả về nội dung file
		} else {
			return []; // Trả về mảng rỗng nếu file không tồn tại
		}
	} catch (error) {
		console.error('Error reading translate file:', error);
		throw new Error('Failed to read translates!');
	}
});

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
