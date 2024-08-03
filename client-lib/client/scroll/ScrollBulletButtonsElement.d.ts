import { ScrollUserElement } from './ScrollUserElement';

export declare class ScrollBulletButtonsElement extends ScrollUserElement {
    #private;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-scroll-bullet-buttons': ScrollBulletButtonsElement;
    }
}
