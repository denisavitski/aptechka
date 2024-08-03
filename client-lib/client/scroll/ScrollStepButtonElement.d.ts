import { ScrollButtonElement } from './ScrollButtonElement';

export declare class ScrollStepButtonElement extends ScrollButtonElement {
    protected handleClick(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-scroll-step-button': ScrollStepButtonElement;
    }
}
