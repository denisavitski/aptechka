import { ScrollElement } from './ScrollElement';

export type ScrollSectionMark = 'current' | 'previous' | 'next' | null;
export type ScrollSectionMarkChangeEvent = CustomEvent<{
    mark: ScrollSectionMark;
}>;
export declare class ScrollSection {
    #private;
    constructor(element: HTMLElement, index: number, scrollElement: ScrollElement);
    get index(): number;
    get size(): number;
    get position(): number;
    destroy(): void;
    setSize(value?: number): void;
    resize(): void;
    transform(): void;
    mark(mark: ScrollSectionMark): void;
}
declare global {
    interface HTMLElementEventMap {
        sectionMarkChange: ScrollSectionMarkChangeEvent;
    }
}
