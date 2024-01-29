export interface StoreEntry<StoreType> {
    current: StoreType;
    previous: StoreType | undefined;
}
export type StoreCallback<Entry extends StoreEntry<any>> = (entry: Entry) => void;
export type StoreEqualityCheckCallback<StoreType> = (currentValue: StoreType, newValue: StoreType) => boolean;
export type StoreValidateCallback<StoreType> = (value: StoreType) => StoreType;
export interface StorePassport {
    name: string;
    description?: string;
}
export interface StoreOptions<StoreType> {
    equalityCheck?: StoreEqualityCheckCallback<StoreType>;
    passport?: StorePassport;
    validate?: StoreValidateCallback<StoreType>;
}
export declare class Store<StoreType = unknown, Entry extends StoreEntry<StoreType> = StoreEntry<StoreType>> {
    #private;
    constructor(value: StoreType, options?: StoreOptions<StoreType>);
    get passport(): StorePassport | undefined;
    get initial(): StoreType;
    get previous(): StoreType | undefined;
    get current(): StoreType;
    set current(value: StoreType);
    get subscribers(): Set<StoreCallback<Entry>>;
    get entry(): Entry;
    subscribe(callback: StoreCallback<Entry>): () => void;
    unsubscribe(callback: StoreCallback<Entry>): void;
    reset(): void;
    close(): void;
}
export declare const activeStores: Store<Store<any, any>[], StoreEntry<Store<any, any>[]>>;
