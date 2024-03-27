import { Store } from '../../store/Store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';
export declare class TweakerColorManagerElement extends TweakerStoreManagerElement<string, 'color'> {
    constructor(...stores: Array<Store<string, 'color'>>);
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-color-manager': TweakerColorManagerElement;
    }
}
