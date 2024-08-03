import { Store } from '../store';
import { TweakerFolderElement } from './TweakerFolderElement';

export interface StoreBox {
    store: Store;
    remainingFolders: Array<string>;
}
export declare class TweakerElement extends TweakerFolderElement {
    #private;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker': TweakerElement;
    }
}
