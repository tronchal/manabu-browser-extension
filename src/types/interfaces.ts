export interface StorageInterface {
    get(): Promise<any>;
    set(value: any): Promise<void>;
}

export interface StoredData {
    bookmarks: number[];
    theme: number;
    category: number;
    level: number;
    furigana: boolean;
    description: boolean;
    examples: boolean;
    voice: number;
}

export interface JapaneseWord {
    id: number,
    word: string;
    furigana: string;
    translation: string;
    category: number;
    level: number;
}
