import { SelectUserElement } from './SelectUserElement';

export declare class SelectHeadElement extends SelectUserElement {
    #private;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-select-head': SelectHeadElement;
    }
}
