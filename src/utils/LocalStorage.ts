import { StorageInterface } from '../types/interfaces';

export class LocalStorage implements StorageInterface {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    async get(): Promise<any> {
        try {
            const item = localStorage.getItem(this.key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting item from localStorage:', error);
            return null;
        }
    }

    async set(value: any): Promise<void> {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(this.key, serializedValue);
        } catch (error) {
            console.error('Error setting item in localStorage:', error);
            throw error;
        }
    }
}
