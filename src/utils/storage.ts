import { storageFactory } from "./storageFactory";
import { StorageInterface, StoredData } from "../types/interfaces";

const defaults: StoredData = {
    darkMode: false,
    bookmarks: [],
    category: 0,
    level: 0,
    furigana: true,
    description: true,
    examples: true,
    voice: 0,
};
const STORAGE_KEY = 'manabuExtension';
const storage: StorageInterface = storageFactory(STORAGE_KEY);
let cachedData: Partial<StoredData | undefined>;
const listeners: ((data: Partial<StoredData>, cb: Function) => void)[] = [];

export async function getData(): Promise<StoredData> {
    return new Promise(async (resolve) => {
        if (cachedData) {
            resolve(cachedData as StoredData);
        }
        const data = await storage.get() || {};
        cachedData = {
            ...defaults,
            ...data
        };
        resolve(cachedData as StoredData);
    });
}

async function setData(data: Partial<StoredData>): Promise<void> {
    return new Promise(async (resolve) => {
        cachedData = { ...cachedData, ...data };
        await storage.set(cachedData);
        resolve();
    });
}

export async function toggleBookmark(wordId: number): Promise<boolean> {
    const data = await getData();
    const { bookmarks } = data;
    const index = bookmarks.indexOf(wordId);
    if (index > -1) {
        bookmarks.splice(index, 1);
        await setData({ bookmarks });
        return false;
    } else {
        bookmarks.push(wordId);
        await setData({ bookmarks });
        return true;
    }
}

export async function isBookmarked(wordId: number): Promise<boolean> {
    const { bookmarks } = await getData();
    return bookmarks.includes(wordId);
}

export async function getProp<T extends keyof StoredData>(key: T): Promise<StoredData[T]> {
    const data: StoredData = await getData();
    return data[key];
}

export async function setProp(key: string, value: any): Promise<void> {
    await setData({ [key]: value });
    listeners.forEach(listener => {
        const changed: Partial<StoredData> = {[key]: value};
        listener(changed, (value: any, cb: Function) => {
            if (typeof value !== 'undefined') {
                cb(value);
            }
        });
    });
}

export function subscribe(callback: (data: Partial<StoredData>, cb: Function) => void): () => void {
    listeners.push(callback);
    return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    };
}
