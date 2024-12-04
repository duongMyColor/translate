const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Sử dụng preload
    },
  });

  win.loadURL("http://localhost:3879");
}

function translateText(text, callback) {
  const pythonScriptPath = path.join(__dirname, "translate.py");
  const pythonProcess = spawn("python", [pythonScriptPath, text]);

  let result = "";
  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", () => {
    try {
      const parsedResult = JSON.parse(result);
      callback(parsedResult);
    } catch (err) {
      console.error("Error parsing JSON:", err);
      callback({ translated_text: "Error translating text." });
    }
  });
}

ipcMain.handle("translateText", (event, text) => {
  return new Promise((resolve) => {
    translateText(text, (result) => {
      resolve(result);
    });
  });
});
ipcMain.handle("addTranslates", async (event, todo) => {
  try {
    const folderPath = path.join(__dirname, "list_translates");
    const filePath = path.join(folderPath, "translate.json");

    // Tạo folder nếu chưa tồn tại
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    let data = [];
    // Đọc file nếu file đã tồn tại
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      data = JSON.parse(fileContent || "[]");
    }

    // Thêm todo mới vào danh sách
    data.push(todo);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return "Todo added successfully!";
  } catch (error) {
    console.error("Error adding todo:", error);
    throw new Error("Failed to add todo!");
  }
});
ipcMain.handle("getTranslates", async (event) => {
  try {
    const folderPath = path.join(__dirname, "list_translates");
    const filePath = path.join(folderPath, "translate.json");

    // Kiểm tra nếu file tồn tại
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(fileContent || "[]");
      return data; // Trả về nội dung file
    } else {
      return []; // Trả về mảng rỗng nếu file không tồn tại
    }
  } catch (error) {
    console.error("Error reading translate file:", error);
    throw new Error("Failed to read translates!");
  }
});


app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
