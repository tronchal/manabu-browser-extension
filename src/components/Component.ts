import { parseTemplate, bindEvents } from '../utils/template';

export default class Component extends HTMLElement {
    protected template: Function | undefined;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async loadTemplate(template: string) {
        const response: Response = await fetch(`${template}.html`);
        const html: string = await response.text();
        this.template = parseTemplate(html);
    }

    async render(data :Object = {}) {
        if (!this.shadowRoot || !this.template) {
            return;
        }
        this.shadowRoot.innerHTML = this.template(data, false);
        bindEvents((this as unknown as { [key: string]: Function }), this.shadowRoot);
    }

    $(selector: string): Element | null | undefined {
        return this.shadowRoot?.querySelector(selector);
    }
}
