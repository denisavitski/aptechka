import { ScrollUserElement } from './ScrollUserElement';

export declare class ScrollbarElement extends ScrollUserElement {
    #private;
    constructor();
    get thumbElement(): HTMLElement;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-scrollbar': ScrollbarElement;
    }
}
