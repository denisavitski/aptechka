import { Store, StoreOptions } from './Store';
export type DerivedCallback<StoreType, DerivedType> = (value: StoreType) => DerivedType;
export declare class Derived<DerivedType, StoreType> extends Store<DerivedType> {
    #private;
    constructor(store: Store<StoreType, any, any>, callback: DerivedCallback<StoreType, DerivedType>, parameters?: StoreOptions<DerivedType>);
    close(): void;
}
