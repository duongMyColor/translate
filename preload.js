const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  translateText: (text, callback) => {
    ipcRenderer.invoke("translateText", text).then(callback);
  },
});
