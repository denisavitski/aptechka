import { Notifier } from '../notifier';
import { Axes2D } from '../utils';

export interface ScrollEntry {
    axis: Axes2D;
    value: number;
    element: HTMLElement;
}
export type ScrollEntriesRegisterCallback = () => void;
declare class ScrollEntries {
    #private;
    get notifier(): Notifier<ScrollEntriesRegisterCallback>;
    register(element: HTMLElement): void;
    unregister(element: HTMLElement): void;
    update(element: HTMLElement, axis: Axes2D, value: number): void;
    hasEntry(element: HTMLElement): boolean;
    getEntry(element: HTMLElement): ScrollEntry;
    getAll(element: HTMLElement): ScrollEntry[];
}
export declare const scrollEntries: ScrollEntries;
export {};
