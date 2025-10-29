import { useState, useEffect } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        if  (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
        } catch (error) {
            console.warn(`Error reading localstorage key "${key}": `, error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`Error setting localstorage key "${key}": `, error);
        }
    }, [key, value]);

    return [value, setValue] as const;
}

export default useLocalStorage;