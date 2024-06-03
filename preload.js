const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	onClipboardContent: (callback) =>
		ipcRenderer.on("clipboard-content", (event, content) => callback(content)),
	onCorrectedText: (callback) => ipcRenderer.on("corrected-text", (event, text) => callback(text)),
	minimizeWindow: () => ipcRenderer.send("minimize-window"),
});
