export interface StorageInterface {
    get(): Promise<any>;
    set(value: any): Promise<void>;
}

export interface StoredData {
    bookmarkedWords: number[];
    darkMode: boolean;
    selectedCategory: string;
    selectedLevel: string;
}

export interface JapaneseWord {
    id: number,
    word: string;
    furigana: string;
    translation: string;
    category: number;
    level: number;
}
