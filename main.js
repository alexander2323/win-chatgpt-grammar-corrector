require("dotenv").config();
const { app, BrowserWindow, globalShortcut, clipboard, Tray, Menu, ipcMain } = require("electron");
const path = require("path");
const axios = require("axios");

let mainWindow;
let tray;

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: false, // Start hidden
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	mainWindow.loadFile("index.html");

	mainWindow.on("close", (event) => {
		if (!app.isQuiting) {
			event.preventDefault();
			mainWindow.hide();
		}
		return false;
	});
}

app.whenReady().then(() => {
	createWindow();

	tray = new Tray(path.join(__dirname, "icon.png")); // Add your tray icon here
	const contextMenu = Menu.buildFromTemplate([
		{
			label: "Show App",
			click: () => {
				mainWindow.show();
			},
		},
		{
			label: "Quit",
			click: () => {
				app.isQuiting = true;
				app.quit();
			},
		},
	]);
	tray.setToolTip("Clipboard Grammar Corrector");
	tray.setContextMenu(contextMenu);

	globalShortcut.register("Shift+Alt+S", () => {
		const clipboardContent = clipboard.readText();
		mainWindow.webContents.send("clipboard-content", clipboardContent);
		correctGrammar(clipboardContent);
		mainWindow.show();
	});

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on("minimize-window", () => {
	mainWindow.minimize();
});

async function correctGrammar(text) {
	const apiKey = process.env.OPENAI_API_KEY;
	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-4",
				messages: [
					{
						role: "system",
						content: "You are a grammar correction assistant. Only answer with the corrected text.",
					},
					{ role: "user", content: `Correct the grammar of the following text: ${text}` },
				],
			},
			{
				headers: {
					Authorization: `Bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
			}
		);

		const correctedText = response.data.choices[0].message.content;
		clipboard.writeText(correctedText);
		mainWindow.webContents.send("corrected-text", correctedText);
	} catch (error) {
		console.error("Error correcting grammar:", error.message);
	}
}
