// Import for side effects
import './components';
import { STORAGE_KEY } from './types/conf';
import { StoredData } from './types/interfaces';

function setDarkMode() {
    document.documentElement.classList.add('dark');
}

if (window.chrome?.storage) {
    (async function() {
        const data: Partial<{manabuExtension: StoredData} | undefined> = await chrome.storage.local.get(STORAGE_KEY);
        if (data?.[STORAGE_KEY]?.darkMode) {
            setDarkMode();
        }
    })();
} else {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (rawData) {
        const data = JSON.parse(rawData);
        if (data?.darkMode) {
            setDarkMode();
        }
    }
}
