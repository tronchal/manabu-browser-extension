// Type definitions for Chrome Extension APIs
export { };

declare global {
    interface Window {
        chrome: typeof chrome;
    }

    namespace chrome {
        const storage: {
            local: {
                get(
                    keys: string | string[] | { [key: string]: any },
                    callback?: (result: { [key: string]: any }) => void
                ): Promise | void;
                set(
                    items: { [key: string]: any },
                    callback?: () => void
                ): void;
            };
        };
    }
}
