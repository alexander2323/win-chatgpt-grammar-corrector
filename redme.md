# Clipboard Grammar Corrector

Clipboard Grammar Corrector is an Electron-based application that enhances your clipboard content by correcting its grammar using OpenAI's GPT-4 model. The app runs in the system tray and can be activated with a keyboard shortcut. It displays the current clipboard content, corrects its grammar, and updates the clipboard with the corrected text.

## Features

- **System Tray Integration**: The app starts minimized in the system tray.
- **Keyboard Shortcut Activation**: Press `Shift+Alt+S` to open the app and correct clipboard content.
- **Clipboard Content Display**: Shows the current clipboard content in a window.
- **Grammar Correction**: Uses OpenAI's GPT-4 model to correct the grammar of the clipboard content.
- **Minimize on Close**: The app minimizes to the tray when the close button is clicked or the `Escape` key is pressed.

## Installation

1. **Clone the repository**:
   bash
   git clone https://github.com/alexander2323/win-chatgpt-grammar-corrector.git
   cd win-chatgpt-grammar-corrector

2. **Install dependencies**:
   bash
   npm install

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your OpenAI API key:
   OPENAI_API_KEY=your_openai_api_key

4. **Run the application**:
   bash
   npm start

## Usage

1. **Start the app**:
   The app will start minimized in the system tray.

2. **Activate the app**:
   Press `Shift+Alt+S` to open the app. The current clipboard content will be displayed, and the grammar correction will be performed immediately.

3. **Minimize the app**:
   - Click the close button (X) to minimize the app to the tray.
   - Press the `Escape` key to minimize the app.

## Code Overview

### `main.js`

- Sets up the Electron app, including the main window and system tray.
- Registers the global shortcut `Shift+Alt+S` to show the window and correct clipboard content.
- Handles the `close` event to minimize the window instead of closing it.
- Uses Axios to make API calls to OpenAI's GPT-4 model for grammar correction.

### `preload.js`

- Exposes IPC methods to the renderer process for communication between the main process and the renderer process.

### `index.html`

- Displays the clipboard content and the corrected text.
- Listens for the `Escape` key to minimize the window.

### `.env`

- Stores the OpenAI API key.

### `package.json`

- Lists the project dependencies and scripts.

## Dependencies

- [Electron](https://www.electronjs.org/): Build cross-platform desktop apps with JavaScript, HTML, and CSS.
- [Axios](https://axios-http.com/): Promise-based HTTP client for the browser and Node.js.
- [dotenv](https://github.com/motdotla/dotenv): Loads environment variables from a `.env` file into `process.env`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Keywords

- Clipboard Grammar Corrector
- Electron App
- OpenAI GPT-4
- Grammar Correction
- System Tray App
- Keyboard Shortcut
- Clipboard Content Display
