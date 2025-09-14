export interface StorageInterface {
    get(): Promise<any>;
    set(value: any): Promise<void>;
}

export interface StoredData {
    bookmarks: number[];
    darkMode: boolean;
    category: number;
    level: number;
    furigana: boolean;
    description: boolean;
    examples: boolean;
}

export interface JapaneseWord {
    id: number,
    word: string;
    furigana: string;
    translation: string;
    category: number;
    level: number;
}
