# Japanese Word New Tab Chrome Extension

## Project Structure
```
japanese-word-new-tab/
├── manifest.json
├── newtab.html
├── newtab.css (Tailwind CSS)
├── tailwind.config.js
├── src/
│   ├── components/
│   │   └── japanese-word-display.ts
│   ├── data/
│   │   └── japanese-words.ts
│   └── utils/
│       ├── storage.ts
│       └── theme.ts
└── assets/
    └── (any images or additional assets)
```

## Implementation Steps

1. **Create project structure and manifest file**
   - Set up the basic Chrome extension structure
   - Create manifest.json with new tab override
   - Configure Tailwind CSS

2. **Design the Web Component for displaying Japanese words**
   - Plan the UI/UX for displaying Japanese words
   - Design responsive layout with Tailwind CSS
   - Include category filtering UI
   - Add dark/light mode toggle UI
   - Add bookmarking UI elements
   - Add JLPT level display

3. **Create data source for Japanese words with furigana and translations**
   - Compile a list of Japanese words
   - Include furigana (reading) and English translations
   - Organize words by categories (e.g., verbs, nouns, adjectives, common phrases)
   - Add JLPT level classification (N1, N2, N3, N4, N5)
   - Structure data appropriately

4. **Implement the TypeScript code for the Web Component**
   - Create a Web Component using vanilla TypeScript
   - Implement logic to display random words
   - Add category filtering functionality
   - Implement dark/light mode toggle with persistence
   - Add bookmarking functionality with local storage
   - Add JLPT level filtering
   - Implement Tailwind CSS styling

5. **Create the HTML page for the new tab**
   - Set up basic HTML structure
   - Link Tailwind CSS and JavaScript files
   - Ensure proper integration with Web Component

6. **Test and package the extension**
   - Test functionality in Chrome
   - Test all features (categories, dark mode, bookmarking, JLPT levels)
   - Package for distribution
   - Document usage

## Technical Details

- Use vanilla TypeScript with Web Components
- Use Tailwind CSS for styling
- No external dependencies except Tailwind CSS
- Responsive design
- Random word selection algorithm
- Category filtering system
- Dark/light mode toggle with persistence
- Bookmarking system using Chrome storage
- JLPT level classification and filtering
- Chrome Extension Manifest V3