import { THEME } from '../../types/conf';
import { getData, setProp } from '../../utils/storage/storage';
import { setTheme, removeTheme } from '../../utils/theme';
import Component from '../Component';
import template from './theme-toggle-template';

export default class ThemeToggle extends Component {
    private themeIdx: number = 0;

    connectedCallback() {
        super.connectedCallback();
        this.loadTemplateFunc(template);
        this.render();
        this.loadSettings();
    }

    async loadSettings() {
        const data = await getData();
        this.themeIdx = data.theme;
    }

    async cycleTheme() {
        removeTheme(this.themeIdx);
        this.themeIdx++;
        if (this.themeIdx >= THEME.length) {
            this.themeIdx = 0;
        }
        setTheme(this.themeIdx);
        await setProp('theme', this.themeIdx);
    }
}

customElements.define('theme-toggle', ThemeToggle);
