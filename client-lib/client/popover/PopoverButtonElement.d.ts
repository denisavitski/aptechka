import { PopoverElement } from './PopoverElement';

export type PopoverButtonType = 'open' | 'close' | 'toggle';
export declare class PopoverButtonElement extends HTMLElement {
    #private;
    constructor();
    get popoverElement(): PopoverElement | undefined;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-popover-button': PopoverButtonElement;
    }
}
