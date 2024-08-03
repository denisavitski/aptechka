import { Store, StoreOptions } from './Store';

export type DerivedArrayCallback<Type, SourceType extends Array<any>, Return = Type> = (value: SourceType[number], index: number, arr: SourceType) => Return;
export declare class DerivedArray<Type, SourceType extends Array<any>> extends Store<Array<Type>> {
    #private;
    constructor(store: Store<SourceType, any>, callback: DerivedArrayCallback<Type, SourceType>, parameters?: StoreOptions<Array<Type>>);
    close(): void;
}
export declare class AsyncDerivedArray<Type, SourceType extends Array<any>> extends Store<Array<Type>> {
    #private;
    constructor(store: Store<SourceType, any>, callback: DerivedArrayCallback<Type, SourceType, Promise<Type>>, parameters?: StoreOptions<Array<Type>>);
    close(): void;
}
