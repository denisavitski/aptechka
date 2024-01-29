export type IntersectorCallback = (entry: IntersectionObserverEntry) => void;
export declare class Intersector {
    #private;
    constructor();
    subscribe(elementOrSelector: HTMLElement | string, callback: IntersectorCallback): (() => void) | undefined;
    unsubscribe(callback: IntersectorCallback): void;
}
export declare const intersector: Intersector;
