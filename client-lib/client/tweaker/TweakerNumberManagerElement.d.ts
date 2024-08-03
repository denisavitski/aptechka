import { Store } from '../store/Store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';

export declare class TweakerNumberManagerElement extends TweakerStoreManagerElement<Store<Array<number> | number, 'number'>> {
    #private;
    constructor(...stores: Array<Store<Array<number> | number, 'number'>>);
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-number-manager': TweakerNumberManagerElement;
    }
}
