import { Store } from '../store/Store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';

export declare class TweakerBooleanManagerElement extends TweakerStoreManagerElement<Store<boolean, 'boolean'>> {
    constructor(...stores: Array<Store<boolean, 'boolean'>>);
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-boolean-manager': TweakerBooleanManagerElement;
    }
}
