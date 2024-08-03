import { Store } from '../store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';

export declare class TweakerLinkManagerElement extends TweakerStoreManagerElement<Store<string, 'link'>> {
    constructor(...stores: Array<Store<string, 'link'>>);
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-link-manager': TweakerLinkManagerElement;
    }
}
