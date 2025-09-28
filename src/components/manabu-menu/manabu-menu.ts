import { getData, setProp } from '../../utils/storage/storage';
import { JLPTLevels, Categories } from '../../types/types';
import { getVoices } from '../../utils/voice';
import { DEFAULT_LANG } from '../../types/conf';
import Component from '../Component';
import template from './manabu-menu-template';

export default class Menu extends Component {
    openClassName = 'menu-opened';

    connectedCallback() {
        super.connectedCallback();
        this.loadTemplateFunc(template);
        this.render();
    }

    async render() {
        const data = await getData();
        const voices = await getVoices(DEFAULT_LANG);
        super.render({
            ...data,
            categories: Categories,
            jlptLevels: JLPTLevels,
            voices: voices.map((voice) => {
                return {
                    localService: voice.localService,
                    name: voice.name
                        // For MS voices
                        .replace(' - Japanese (Japan)', '')
                        // For Apple voices
                        .replace(' (Japanese (Japan))', '')
                }
            })
        });
    }

    toggle() {
        this.classList.toggle(this.openClassName);
    }

    close() {
        this.classList.remove(this.openClassName);
    }

    selectCategory(e: Event) {
        const target = e.target as HTMLSelectElement;
        setProp('category', parseInt(target.value, 10));
    }

    selectLevel(e: Event) {
        const target = e.target as HTMLSelectElement;
        setProp('level', parseInt(target.value, 10));
    }

    selectVoice(e: Event) {
        const target = e.target as HTMLSelectElement;
        setProp('voice', parseInt(target.value, 10));
    }

    changeSetting(e: Event, name: string) {
        const target = e.target as HTMLInputElement;
        setProp(name, target.checked);
    }
}

customElements.define('manabu-menu', Menu);
