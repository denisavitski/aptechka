export interface StoreState<StoreType> {
    current: StoreType;
    previous: StoreType | undefined;
    initial: StoreType;
}
export type StoreCallback<StoreType> = (state: StoreState<StoreType>) => void;
export type StoreEqualityCheckCallback<StoreType> = (currentValue: StoreType, newValue: StoreType) => boolean;
export interface StoreManager {
    type: string;
    disabled?: boolean;
    invisible?: boolean;
}
export interface StoreStringManager extends StoreManager {
    type: 'string';
}
export interface StoreNumberManager extends StoreManager {
    type: 'number';
    min?: number;
    max?: number;
    step?: number;
    ease?: number;
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
    passport?: StorePassport<StoreManager> | undefined;
    validate?: StoreMiddleware<StoreType>;
    skipSubscribeNotification?: boolean;
    notifyAndClose?: boolean;
    invisible?: boolean;
}
export declare class Store<StoreType = unknown, StoreManager extends StoreManagerType = StoreManagerType> {
    #private;
    constructor(value: StoreType, options?: StoreOptions<StoreType, StoreManager>);
    get passport(): StorePassport<StoreManager> | undefined;
    get initial(): StoreType;
    get previous(): StoreType | undefined;
    get current(): StoreType;
    set current(value: StoreType);
    get subscribers(): Set<StoreCallback<StoreType>>;
    addMiddleware(middleware: StoreMiddleware<StoreType>): void;
    removeMiddleware(middleware: StoreMiddleware<StoreType>): void;
    subscribe(callback: StoreCallback<StoreType>): () => void;
    unsubscribe(callback: StoreCallback<StoreType>): void;
    reset(): void;
    close(): void;
}
export declare const activeStores: Store<Store<any, any>[], keyof StoreManagers>;
