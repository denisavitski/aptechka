import { ScrollElement } from './ScrollElement';

export declare class ScrollUserElement extends HTMLElement {
    #private;
    get scrollElement(): ScrollElement;
    protected connectedCallback(): void;
}
