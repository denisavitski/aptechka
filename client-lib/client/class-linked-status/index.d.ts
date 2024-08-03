import { Store } from '../store';

export declare class ClassLinkedStatus<T extends {
    [key in string]: boolean;
}> extends Store<T> {
    #private;
    constructor(element: HTMLElement, value: T);
    isTrue(key: keyof T): boolean;
    isFalse(key: keyof T): boolean;
    reset(): void;
    set(key: keyof T, value?: boolean): void;
}
