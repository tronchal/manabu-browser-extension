import { THEME } from "../types/conf";

export function removeTheme(themeIdx: number | undefined) {
    if (themeIdx !== undefined && THEME[themeIdx]) {
        document.documentElement.classList.remove(THEME[themeIdx]);
    }
}

export function setTheme(themeIdx: number | undefined) {
    if (themeIdx !== undefined && THEME[themeIdx]) {
        document.documentElement.classList.add(THEME[themeIdx]);
    }
}
