import { ElementOrSelector } from '../utils';

export type IntersectorCallback = (entry: IntersectionObserverEntry) => void;
export declare class Intersector {
    #private;
    constructor();
    subscribe(elementOrSelector: ElementOrSelector, callback: IntersectorCallback): () => void;
    unsubscribe(callback: IntersectorCallback): void;
}
export declare const intersector: Intersector;
