import { CustomElement } from '../custom-element';
export declare class StudioElement extends CustomElement {
    #private;
    constructor();
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-studio': StudioElement;
    }
}
