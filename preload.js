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
  getTranslates: async () => {
    try {
      const response = await ipcRenderer.invoke("getTranslates");

      console.log({ response });
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
  generateTTS: async (text, voiceIndex) => {
    try {
      const response = await ipcRenderer.invoke(
        "generateTTS",
        text,
        voiceIndex
      );
      return response;
    } catch (error) {
      console.error("TTS Error:", error);
      throw error;
    }
  },
});

