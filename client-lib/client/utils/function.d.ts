export declare const debounce: <F extends (...args: Parameters<F>) => ReturnType<F>>(callback: F, delay?: number) => ((...args: Parameters<F>) => void);
export declare const throttle: <F extends (...args: Parameters<F>) => ReturnType<F>>(callback: F, delay?: number) => ((...args: Parameters<F>) => void);
