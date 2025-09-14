import { getProp, setProp } from '../../utils/storage';
import Component from '../Component';

export default class ThemeToggle extends Component {
    async connectedCallback() {
        this.loadPreferences();
        await this.loadTemplate('theme-toggle');
        this.render();
    }

    async loadPreferences() {
        const darkMode = await getProp('darkMode');
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }
    }

    async toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark');
        await setProp('darkMode', isDark);
    }
}

customElements.define('theme-toggle', ThemeToggle);
