export interface StoreEntry<StoreType> {
    current: StoreType;
    previous: StoreType | undefined;
}
export type StoreCallback<Entry extends StoreEntry<any>> = (entry: Entry) => void;
export type StoreEqualityCheckCallback<StoreType> = (currentValue: StoreType, newValue: StoreType) => boolean;
export interface StoreManager {
    type: string;
    disabled?: boolean;
}
export interface StoreStringManager extends StoreManager {
    type: 'string';
}
export interface StoreNumberManager extends StoreManager {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
}
export interface StoreRangeManager extends StoreManager {
    type: 'range';
    min?: number;
    max?: number;
    step?: number;
}
export interface StoreColorManager extends StoreManager {
    type: 'color';
}
export interface StoreBooleanManager extends StoreManager {
    type: 'boolean';
}
export interface StoreLinkManager extends StoreManager {
    type: 'link';
    sameWindow?: boolean;
}
export interface StoreSelectManager extends StoreManager {
    type: 'select';
    variants: Array<string>;
}
export interface StoreManagers {
    select: StoreSelectManager;
    link: StoreLinkManager;
    boolean: StoreBooleanManager;
    color: StoreColorManager;
    range: StoreRangeManager;
    number: StoreNumberManager;
    string: StoreStringManager;
}
export type StoreManagerType = keyof StoreManagers;
export interface StorePassport<T extends StoreManagerType = StoreManagerType> {
    name: string;
    description?: string;
    manager?: StoreManagers[T];
}
export type StoreMiddleware<T> = (value: T) => T;
export interface StoreOptions<StoreType, StoreManager extends StoreManagerType = StoreManagerType> {
    equalityCheck?: StoreEqualityCheckCallback<StoreType>;
    passport?: StorePassport<StoreManager>;
    validate?: StoreMiddleware<StoreType>;
    skipSubscribeNotification?: boolean;
}
export declare class Store<StoreType = unknown, StoreManager extends StoreManagerType = StoreManagerType, Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>> {
    #private;
    constructor(value: StoreType, options?: StoreOptions<StoreType, StoreManager>);
    get passport(): StorePassport<StoreManager> | undefined;
    get initial(): StoreType;
    get previous(): StoreType | undefined;
    get current(): StoreType;
    set current(value: StoreType);
    get subscribers(): Set<StoreCallback<Entry>>;
    get entry(): Entry;
    addMiddleware(middleware: StoreMiddleware<StoreType>): void;
    removeMiddleware(middleware: StoreMiddleware<StoreType>): void;
    subscribe(callback: StoreCallback<Entry>): () => void;
    unsubscribe(callback: StoreCallback<Entry>): void;
    reset(): void;
    close(): void;
}
export declare const activeStores: Store<Store<any, any, any>[], keyof StoreManagers, StoreEntry<Store<any, any, any>[]>>;
