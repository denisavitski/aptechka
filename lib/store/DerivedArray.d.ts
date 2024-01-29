import { Store, StoreOptions } from './Store';
export type DerivedArrayCallback<StoreType, DerivedType> = (value: StoreType) => DerivedType;
export declare class DerivedArray<DerivedType, StoreType extends Array<any> = Array<any>> extends Store<DerivedType[]> {
    #private;
    constructor(store: Store<StoreType>, callback: DerivedArrayCallback<StoreType[number], DerivedType>, parameters?: StoreOptions<DerivedType[]>);
    close(): void;
}
