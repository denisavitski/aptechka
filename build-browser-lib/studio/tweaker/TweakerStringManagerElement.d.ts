import { Store, StoreManagerType } from '../../store/Store';
import { TweakerStoreManagerElement } from './TweakerStoreManagerElement';
export declare class TweakerStringManagerElement<T extends string | number = string, M extends Extract<StoreManagerType, 'string' | 'number' | 'range' | 'link'> = 'string'> extends TweakerStoreManagerElement<T, M> {
    #private;
    constructor(...stores: Array<Store<T, M>>);
    protected appendContent(value: any): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-string-manager': TweakerStringManagerElement;
    }
}
