import { Store, StoreOptions } from './Store';
export type ComposedCallback<ComposedType> = () => ComposedType;
export declare class Composed<ComposedType> extends Store<ComposedType> {
    #private;
    constructor(stores: Array<Store<any>>, callback: ComposedCallback<ComposedType>, parameters?: StoreOptions<ComposedType>);
    close(): void;
}
