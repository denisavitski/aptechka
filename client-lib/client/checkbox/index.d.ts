export declare class CheckboxElement extends HTMLElement {
    #private;
    static formAssociated: boolean;
    constructor();
    get checked(): boolean;
    set checked(state: boolean);
    get value(): string;
    set value(value: string);
}
declare global {
    interface HTMLElementTagNameMap {
        'e-checkbox': CheckboxElement;
    }
}
