import { Store } from '../../store/Store';
import { TweakerNumberManagerElement } from './TweakerNumberManagerElement';
export declare class TweakerRangeManagerElement extends TweakerNumberManagerElement<'range'> {
    constructor(...stores: Array<Store<number, 'range'>>);
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-range-manager': TweakerRangeManagerElement;
    }
}
