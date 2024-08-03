import { Store, StoreOptions } from './Store';

export type CachedCallback<Type, SourceType extends Array<CachedSource>, Return = Type> = (value: SourceType[number]['value'], index: number, arr: SourceType) => Return;
export interface CachedSource<T = any> {
    key: any;
    value: T;
    revalidate?: boolean;
}
export declare class Cached<Type, SourceType extends Array<CachedSource>> extends Store<Array<Type>> {
    #private;
    constructor(store: Store<SourceType, any>, callback: CachedCallback<Type, SourceType>, parameters?: StoreOptions<Array<Type>>);
    close(): void;
}
export declare class AsyncCached<Type, SourceType extends Array<CachedSource>> extends Store<Array<Type>> {
    #private;
    constructor(store: Store<SourceType, any>, callback: CachedCallback<Type, SourceType, Promise<Type>>, parameters?: StoreOptions<Array<Type>>);
    close(): void;
}
