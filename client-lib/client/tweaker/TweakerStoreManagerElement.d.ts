import { Store } from '../store';

export declare class TweakerStoreManagerElement<S extends Store<any, any>> extends HTMLElement {
    #private;
    constructor(...stores: Array<S>);
    addStore(store: S): void;
    protected get firstStore(): S;
    protected get stores(): S[];
    protected updateStores(value: S['current']): void;
}
