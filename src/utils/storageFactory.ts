import { ChromeStorage } from './ChromeStorage';
import { LocalStorage } from './LocalStorage';
import { StorageInterface } from '../types/interfaces';

export function storageFactory(key: string): StorageInterface {
    const isChromeExtension = window.chrome?.storage;
    if (isChromeExtension) {
        return new ChromeStorage(key);
    } else {
        return new LocalStorage(key);
    }
}
