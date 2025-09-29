# Manabu 学ぶ
Learn Japanese words every time you open a new tab in your browser.  
(_Currently only Chrome is supported._)  
<img src="./manabu.png" width="200" alt="Manaub logo">

## Features
- Browser extension that changes the new tab page.
- Displays a random Japanese word with furigana and English translation on every new tab.
- Dark/light mode toggle with persistent settings.
- ~~Bookmark favorite words for later review.~~
- Filter words by category (noun, verb, adjective, etc.).
- Filter words by [JLPT](https://www.jlpt.jp/e/) level (N1 to N5).
- Read out Japanese words by using the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API).
- Built with TypeScript and Web Components.

## Installation
You need at least [node.js](https://nodejs.org/en) v22 installed in your device.

1. Clone or download this repository.
1. Open a terminal window and navigate to the repository folder.
1. Run this command to install npm dependencies:
   ```bash
   npm install
   ```
1. Build the extension:
   ```bash
   npm run build
   ```
1. Open Chrome and navigate to `chrome://extensions`.
1. Enable "Developer mode" in the top right corner.
1. Click "Load unpacked" and select the extension directory.

## Development
To start local development:
```bash
npm run dev
```
This will watch for changes in the src/ folder, rebuild automatically and reload the browser.

To start local development as a Chrome extension:
```bash
npm run dev:chrome
```

---

Based on [言葉 の Tab](https://addons.mozilla.org/en-US/firefox/addon/the-tab-of-words/) and [Tab of Words](https://tab-of-words.keibungen.com/).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
