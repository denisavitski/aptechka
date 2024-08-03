import { Pointer } from './Pointer';

export declare class PointerElement extends HTMLElement {
    #private;
    constructor();
    get pointer(): Pointer;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-pointer': PointerElement;
    }
}
