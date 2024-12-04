const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  translateText: (text, callback) => {
    ipcRenderer.invoke("translateText", text).then(callback);
  },
  addTranslates: async (todo) => {
    try {
      const response = await ipcRenderer.invoke("addTranslates", todo);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
});

