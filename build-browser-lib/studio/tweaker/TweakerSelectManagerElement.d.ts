import { Store } from '../../store/Store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';
export declare class TweakerSelectManagerElement extends TweakerStoreManagerElement<string, 'select'> {
    constructor(...stores: Array<Store<string, 'select'>>);
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-select-manager': TweakerSelectManagerElement;
    }
}
