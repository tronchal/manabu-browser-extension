import { parseTemplate, bindEvents } from '../utils/template';

export default class Component extends HTMLElement {
    protected template: Function | undefined;
    protected hasStyleTemplate: Boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        if (this.shadowRoot) {
            const styleTemplate = this.querySelector('template');
            if (styleTemplate) {
                const sheet = new CSSStyleSheet();
                sheet.replaceSync(styleTemplate.content.textContent);
                this.shadowRoot.adoptedStyleSheets = [sheet];
                this.hasStyleTemplate = true;
            }
        }
    }

    async loadTemplateFunc(template: Function) {
        this.template = template;
    }

    async render(data :Object = {}) {
        if (!this.shadowRoot || !this.template) {
            return;
        }
        let template = parseTemplate(this.template(data))(data, false);
        // Do not laod external CSS if using inline styles
        if (this.hasStyleTemplate) {
            template = template.replace(/<link[^>]+>/, '');
        }
        this.shadowRoot.innerHTML = template;
        bindEvents((this as unknown as { [key: string]: Function }), this.shadowRoot);
    }

    $(selector: string): Element | null | undefined {
        return this.shadowRoot?.querySelector(selector);
    }
}
