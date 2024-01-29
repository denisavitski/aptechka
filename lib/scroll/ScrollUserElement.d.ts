import { CustomElement } from '../custom-element';
import { ScrollElement } from './ScrollElement';
export declare class ScrollUserElement extends CustomElement {
    #private;
    get scrollElement(): ScrollElement;
    protected connectedCallback(): void;
}
