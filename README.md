# Workshop Portfolio + Gemini Guide

Open `index.html` in a browser. No packages, Node.js, or server are needed.

Update `portfolioFacts` in `script.js` to describe the student's own work.

## Adding your Gemini API key

1. Make a copy of `config.example.js` and name it `config.js` (same folder).
2. Open `config.js` and replace `PASTE_YOUR_KEY_HERE` with your Gemini API key.
3. Reload `index.html`.

`config.js` is listed in `.gitignore`, so git will not commit it. Never upload `config.js` anywhere, including through the GitHub website's upload page.

Anyone who can load a page that includes `config.js` can read the key, so this setup is only for a local workshop demo. Without `config.js`, the site still works and the guide shows a setup message.

Replace `headshot.svg` with the student's own image when they are ready.
