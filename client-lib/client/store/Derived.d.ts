import { Store, StoreOptions } from './Store';

export type DerivedCallback<SourceType, Type, Return = Type> = (value: SourceType) => Return;
export declare class Derived<Type, SourceType> extends Store<Type> {
    #private;
    constructor(store: Store<SourceType, any>, callback: DerivedCallback<SourceType, Type>, parameters?: StoreOptions<Type>);
    close(): void;
}
export declare class AsyncDerived<Type, SourceType> extends Store<Type> {
    #private;
    constructor(store: Store<SourceType, any>, callback: DerivedCallback<SourceType, Type, Promise<Type>>, parameters?: StoreOptions<Type>);
    close(): void;
}
