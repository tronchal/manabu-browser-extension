import { getRandomWord } from '../../data/wordGenerator';
import { getData, subscribe, toggleBookmark, isBookmarked } from '../../utils/storage';
import { JapaneseWord, StoredData } from '../../types/interfaces';
import { JLPTLevels, Categories } from '../../types/types';
import Component from '../Component';

export default class Manabu extends Component {
    private word: JapaneseWord | undefined;
    private isBookmarked: boolean = false;

    async connectedCallback() {
        await this.loadTemplate('manabu');
        await this.loadNewWord();
        this.setupEventListeners();
    }

    async loadNewWord() {
        const data = await getData();
        this.word = await getRandomWord(data.category, data.level);
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

    async render() {
        const data = await getData();
        super.render({
            ...data,
            word: {
                ...this.word,
                sanitized: this.word?.word.replace(/[〜（）]/g, '')
            },
            isBookmarked: this.isBookmarked,
            categories: Categories,
            JLPTLevels: JLPTLevels
        });
    }

    subscribeTo(topic: keyof StoredData, callback: Function) {
        subscribe((data: Partial<StoredData>, cb: Function) => cb(data[topic], callback));
    }

    setupEventListeners() {
        this.subscribeTo('category', () => this.loadNewWord());
        this.subscribeTo('level', () => this.loadNewWord());
        this.subscribeTo('furigana', () => this.render());
        this.subscribeTo('description', () => this.render());
        this.subscribeTo('examples', () => this.render());
    }
}

customElements.define('manabu-word', Manabu);
