import { Axes2D } from '../utils';
interface ScrollEntry {
    axis: Axes2D;
    value: number;
}
declare class ScrollEntries {
    #private;
    register(element: HTMLElement): void;
    unregister(element: HTMLElement): void;
    update(element: HTMLElement, axis: Axes2D, value: number): void;
    hasEntry(element: HTMLElement): boolean;
    getEntry(element: HTMLElement): ScrollEntry;
    getClosest(element: HTMLElement): ScrollEntry | null;
    getAll(element: HTMLElement): ScrollEntry[];
}
export declare const scrollEntries: ScrollEntries;
export {};
