import { ElementOrSelector } from '../utils';
export type ElementResizerCallback = (entry: ResizeObserverEntry) => void;
export declare class ElementResizer {
    #private;
    constructor();
    subscribe(elementOrSelector: ElementOrSelector, callback: ElementResizerCallback): () => void;
    unsubscribe(callback: ElementResizerCallback): void;
}
export declare const elementResizer: ElementResizer;
