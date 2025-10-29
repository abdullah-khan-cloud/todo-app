import { renderHook, act } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';

describe('useLocalStorage hook', () => {
    const KEY = 'test-key';

    beforeEach(() => {
        localStorage.clear();
    });

    it('should initialize with value from localStorage if present', () => {
        localStorage.setItem(KEY, JSON.stringify('stored value'));

        const { result } = renderHook(() => useLocalStorage(KEY, 'default'));
        const [value] = result.current;

        expect(value).toBe('stored value');
    });

    it('should update localStorage when state is updated', () => {
        const { result } = renderHook(() => useLocalStorage(KEY, 'initial'));

        act(() => {
            const [, setValue] = result.current;
            setValue('updated');
        })

        const [updatedValue] = result.current;

        expect(updatedValue).toBe('updated');
        expect(localStorage.getItem(KEY)).toBe(JSON.stringify('updated'));
    });

    it('should handle object values', () => {
        const obj = { name: 'Test', role: 'Dev'};

        const { result } = renderHook(() => useLocalStorage(KEY, obj));

        const [value] = result.current;
        expect(value).toEqual(obj);
    })
})