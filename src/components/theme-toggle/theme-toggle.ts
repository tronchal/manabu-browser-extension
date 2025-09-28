import { setProp } from '../../utils/storage/storage';
import Component from '../Component';
import template from './theme-toggle-template';

export default class ThemeToggle extends Component {
    connectedCallback() {
        super.connectedCallback();
        this.loadTemplateFunc(template);
        this.render();
    }

    async toggleDarkMode() {
        const isDark = document.documentElement.classList.toggle('dark');
        await setProp('darkMode', isDark);
    }
}

customElements.define('theme-toggle', ThemeToggle);
