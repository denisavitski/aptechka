export interface SelectToggleDetail {
    opened: boolean;
}
export declare class SelectElement extends HTMLElement {
    #private;
    static formAssociated: boolean;
    constructor();
    get value(): string;
    set value(value: string);
    get internals(): ElementInternals;
    get opened(): boolean;
    open(): void;
    close(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-select': SelectElement;
    }
    interface HTMLElementEventMap {
        selectToggle: CustomEvent<SelectToggleDetail>;
    }
}
