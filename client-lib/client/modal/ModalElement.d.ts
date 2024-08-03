import { PopoverElement } from '../popover';

export declare class ModalElement extends PopoverElement {
    #private;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-modal': ModalElement;
    }
}
