import { CustomElement } from '../../custom-element';
import { Store, StoreManagerType } from '../../store';
export declare class TweakerStoreManagerElement<T, K extends StoreManagerType> extends CustomElement {
    #private;
    constructor(...stores: Array<Store<T, K>>);
    addStore(store: Store<T, K>): void;
    protected get firstStore(): Store<T, K, import('../../store').StoreEntry<T>>;
    protected get stores(): Store<T, K, import('../../store').StoreEntry<T>>[];
    protected updateStores(value: T): void;
}
