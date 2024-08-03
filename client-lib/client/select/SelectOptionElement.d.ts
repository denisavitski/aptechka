import { SelectUserElement } from './SelectUserElement';

export declare class SelectOptionElement extends SelectUserElement {
    #private;
    constructor();
    get value(): string;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-select-option': SelectOptionElement;
    }
}
