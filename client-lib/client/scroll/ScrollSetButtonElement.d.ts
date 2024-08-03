import { ScrollButtonElement } from './ScrollButtonElement';

export declare class ScrollSetButtonElement extends ScrollButtonElement {
    protected handleClick(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-scroll-set-button': ScrollSetButtonElement;
    }
}
