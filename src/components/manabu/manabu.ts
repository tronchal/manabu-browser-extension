import { getRandomWord } from '../../data/wordGenerator';
import { getData, toggleBookmark, isBookmarked, setProp } from '../../utils/storage';
import { JapaneseWord } from '../../types/interfaces';
import { JLPTLevels, Categories } from '../../types/types';
import Component from '../Component';

export default class Manabu extends Component {
    private word: JapaneseWord | undefined;
    private isBookmarked: boolean = false;

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.loadTemplate('manabu.html');
        await this.loadNewWord();
    }

    async loadNewWord() {
        const data = await getData();
        this.word = await getRandomWord(
            parseInt(data.selectedCategory, 10),
            parseInt(data.selectedLevel, 10)
        );
        if (this.word) {
            this.isBookmarked = await isBookmarked(this.word.id);
        }
        this.render();
    }

    async toggleBookmark() {
        if (this.word) {
            this.isBookmarked = await toggleBookmark(this.word.id);
            this.render();
        }
    }

    async selectCategory(category: number) {
        await setProp('selectedCategory', category);
        this.loadNewWord();
    }

    async selectJLPTLevel(level: number) {
        await setProp('selectedLevel', level);
        this.loadNewWord();
    }

    async render() {
        const data = await getData();
        super.render({
            ...data,
            word: this.word,
            isBookmarked: this.isBookmarked,
            categories: Categories,
            JLPTLevels: JLPTLevels
        });
    }

    setupEventListeners() {
        if (!this.shadowRoot) {
            return;
        }

        const newWordBtn = this.shadowRoot.getElementById('newWordBtn');
        if (newWordBtn) {
            newWordBtn.addEventListener('click', () => this.loadNewWord());
        }

        const bookmarkBtn = this.shadowRoot.getElementById('bookmarkBtn');
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', () => this.toggleBookmark());
        }

        const categoryFilter = this.shadowRoot.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.selectCategory(parseInt(target.value, 10));
            });
        }

        const jlptFilter = this.shadowRoot.getElementById('jlptFilter');
        if (jlptFilter) {
            jlptFilter.addEventListener('change', (e) => {
                const target = e.target as HTMLSelectElement;
                this.selectJLPTLevel(parseInt(target.value, 10));
            });
        }
    }
}

customElements.define('manabu-word', Manabu);
