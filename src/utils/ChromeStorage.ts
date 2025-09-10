import { StorageInterface } from '../types/interfaces';

export class ChromeStorage implements StorageInterface {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    get(): Promise<any> {
        return new Promise((resolve) => {
            chrome.storage.local.get([this.key], (result) => {
                const data = result[this.key] || {};
                resolve(data);
            });
        });
    }

    set(value: any): Promise<void> {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [this.key]: value }, () => {
                resolve();
            });
        });
    }
}
