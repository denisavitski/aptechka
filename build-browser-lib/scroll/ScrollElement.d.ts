import { Damped } from '../animation';
import { Attribute } from '../attribute';
import { CustomElement } from '../custom-element';
import { Store } from '../store';
import { Axes2D } from '../utils';
export type ScrollBehaviour = 'smooth' | 'instant';
export declare class ScrollElement extends CustomElement {
    #private;
    constructor();
    get dampingAttribute(): Attribute<number>;
    get axisAttibute(): Attribute<Axes2D>;
    get pagesAttibute(): Attribute<number>;
    get splitAttibute(): Attribute<boolean>;
    get sectionalAttibute(): Attribute<boolean>;
    get infiniteAttribute(): Attribute<boolean>;
    get dampingAttibute(): Attribute<number>;
    get disabledAttibute(): Attribute<boolean>;
    get hibernatedAttibute(): Attribute<boolean>;
    get currentScrollValue(): number;
    get targetScrollValue(): number;
    get contentElement(): HTMLElement;
    get position(): number;
    get contentPosition(): number;
    get viewportSize(): number;
    get scrollSize(): number;
    get gap(): number;
    get counter(): Store<number, keyof import('../store').StoreManagers, import('../store').StoreEntry<number>>;
    get distance(): number;
    get overscroll(): number;
    get vertical(): boolean;
    get currentProgress(): number;
    get targetProgress(): number;
    get speed(): number;
    get direction(): number;
    get isRunning(): Store<boolean, keyof import('../store').StoreManagers, import('../store').StoreEntry<boolean>>;
    onScroll(...parameters: Parameters<Damped['subscribe']>): () => void;
    offScroll(...parameters: Parameters<Damped['unsubscribe']>): void;
    get context(): {
        currentScrollValue: number;
        targetScrollValue: number;
        contentElement: HTMLElement;
        position: number;
        contentPosition: number;
        viewportSize: number;
        scrollSize: number;
        gap: number;
        counter: Store<number, keyof import('../store').StoreManagers, import('../store').StoreEntry<number>>;
        distance: number;
        overscroll: number;
        vertical: boolean;
        currentProgress: number;
        targetProgress: number;
        speed: number;
        direction: number;
        isRunning: Store<boolean, keyof import('../store').StoreManagers, import('../store').StoreEntry<boolean>>;
        range: (from: number, distance: number, margin?: number) => number;
        curve: (from: number, distance: number, margin?: number) => number;
        visible: (from: number, distance: number, margin?: number) => boolean;
    };
    range(from: number, distance: number, margin?: number): number;
    curve(from: number, distance: number, margin?: number): number;
    visible(from: number, distance: number, margin?: number): boolean;
    scrollToSection(sectionIndex: number, behaviour?: ScrollBehaviour): void;
    shiftSections(direction: number, behaviour?: ScrollBehaviour): void;
    setPosition(value: number, behaviour?: 'smooth' | 'instant'): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-scroll': ScrollElement;
    }
}
