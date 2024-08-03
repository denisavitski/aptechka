import { Store } from '../store/Store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';

export declare class TweakerStringManagerElement<S extends Store<any, any> = Store<string, 'string'>> extends TweakerStoreManagerElement<S> {
    constructor(...stores: Array<S>);
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-string-manager': TweakerStringManagerElement;
    }
}
