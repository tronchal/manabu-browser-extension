import { getProp, setProp } from '../../utils/storage';
import Component from '../Component';

export default class ThemeToggle extends Component {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.loadPreferences();
        await this.loadTemplate('theme-toggle.html');
        this.render();
    }

    async loadPreferences() {
        const darkMode = await getProp('darkMode');
        if (darkMode) {
            document.documentElement.classList.add('dark');
        }
    }

    async toggleDarkMode() {
        if (!this.shadowRoot) {
            return;
        }
        const isDark = document.documentElement.classList.toggle('dark');
        await setProp('darkMode', isDark);
    }

    setupEventListeners() {
        if (!this.shadowRoot) {
            return;
        }
        const darkModeToggle = this.shadowRoot.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }
    }
}

customElements.define('theme-toggle', ThemeToggle);
