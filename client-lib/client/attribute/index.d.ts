import { Store, StoreCallback, StoreOptions } from '../store';
import { ElementOrSelector } from '../utils';

export interface AttributeOptions<T> extends StoreOptions<T> {
    sync?: boolean;
}
export declare class Attribute<T extends string | number | boolean> extends Store<T> {
    #private;
    constructor(elementOrSelector: ElementOrSelector, name: string, defaultValue: T, options?: AttributeOptions<T>);
    subscribe(callback: StoreCallback<T>): () => void;
    unsubscribe(callback: StoreCallback<T>): void;
    observe(): void;
    unobserve(): void;
    close(): void;
}
