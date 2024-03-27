import { Store, StoreManagerType } from '../../store';
import { TweakerStringManagerElement } from './TweakerStringManagerElement';
export declare class TweakerNumberManagerElement<M extends Extract<StoreManagerType, 'number' | 'range'> = 'number'> extends TweakerStringManagerElement<number, M> {
    #private;
    constructor(...stores: Array<Store<number, M>>);
    protected get min(): number;
    protected get max(): number;
    protected get step(): number;
    protected toFixed(value: number): number;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-number-manager': TweakerNumberManagerElement;
    }
}
