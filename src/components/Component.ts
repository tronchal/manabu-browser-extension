import { parseTemplate } from '../utils/template';

export default class Component extends HTMLElement {
    protected template: Function | undefined;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async loadTemplate(template: string) {
        const response: Response = await fetch(template);
        const html: string = await response.text();
        this.template = parseTemplate(html);
    }

    setupEventListeners() {
    }

    async render(data :Object = {}) {
        if (!this.shadowRoot || !this.template) {
            return;
        }
        this.shadowRoot.innerHTML = this.template(data, false);
        // Set up event listeners after rendering
        this.setupEventListeners();
    }
}
