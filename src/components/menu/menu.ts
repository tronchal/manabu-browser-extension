import { getData, setProp } from '../../utils/storage';
import { JLPTLevels, Categories } from '../../types/types';
import Component from '../Component';

export default class Menu extends Component {
    openClassName = 'menu-opened';

    async connectedCallback() {
        await this.loadTemplate('menu');
        this.render();
    }

    async render() {
        const data = await getData();
        super.render({
            ...data,
            categories: Categories,
            JLPTLevels: JLPTLevels
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

    changeSetting(e: Event, name: string) {
        const target = e.target as HTMLInputElement;
        setProp(name, target.checked);
    }
}

customElements.define('manabu-menu', Menu);
