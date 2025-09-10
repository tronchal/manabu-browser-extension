import { storageFactory } from "./storageFactory";
import { StorageInterface, StoredData } from "../types/interfaces";

const STORAGE_KEY = 'manabuExtension';
const storage: StorageInterface = storageFactory(STORAGE_KEY);
let cachedData: Partial<StoredData | undefined>;

export async function getData(): Promise<StoredData> {
    return new Promise(async (resolve) => {
        if (cachedData) {
            resolve(cachedData as StoredData);
        }
        const data = await storage.get() || {};
        cachedData = {
            darkMode: data.darkMode || false,
            bookmarkedWords: data.bookmarkedWords || [],
            selectedCategory: data.selectedCategory || 0,
            selectedLevel: data.selectedLevel || 0
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
    const { bookmarkedWords } = data;
    const index = bookmarkedWords.indexOf(wordId);
    if (index > -1) {
        bookmarkedWords.splice(index, 1);
        await setData({ bookmarkedWords });
        return false;
    } else {
        bookmarkedWords.push(wordId);
        await setData({ bookmarkedWords });
        return true;
    }
}

export async function isBookmarked(wordId: number): Promise<boolean> {
    const { bookmarkedWords } = await getData();
    return bookmarkedWords.includes(wordId);
}

export async function getProp<T extends keyof StoredData>(key: T): Promise<StoredData[T]> {
    const data: StoredData = await getData();
    return data[key];
}

export async function setProp(key: string, value: any): Promise<void> {
    await setData({ [key]: value });
}
