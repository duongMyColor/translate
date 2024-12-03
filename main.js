const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

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
