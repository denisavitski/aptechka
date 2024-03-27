import { PopoverElement } from './PopoverElement';
import { AbstractButtonElement } from '../abstract-elements';
export type PopoverButtonType = 'open' | 'close' | 'toggle';
export declare class PopoverButtonElement extends AbstractButtonElement {
    #private;
    get popoverElement(): PopoverElement | undefined;
    click(): void;
    protected connectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-popover-button': PopoverButtonElement;
    }
}
