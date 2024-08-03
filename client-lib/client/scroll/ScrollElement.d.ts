import { Damped } from '../animation';
import { Store } from '../store';
import { Axes2D, EasingFunction } from '../utils';
import { CSSProperty } from '../css-property';
import { ScrollSection } from './ScrollSection';

export type ScrollBehaviour = 'smooth' | 'instant';
export interface ScrollSetOptions {
    behaviour?: ScrollBehaviour;
    tween?: {
        easing?: EasingFunction;
        duration: number;
    };
}
export declare class ScrollElement extends HTMLElement {
    #private;
    constructor();
    get damped(): Damped;
    get controlsCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get axisCSSProperty(): CSSProperty<Axes2D, keyof import('../store').StoreManagers>;
    get directionCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get pagesCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get splitCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get sectionalCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get autoSizeCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get wheelMaxDeltaCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get sectionsInViewCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get loopCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get dampingCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get massCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get stiffnessCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get mouseDragCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get sectionDistanceScaleCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get autoplayCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get autoplayPauseDurationCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get autoplayUserDirectionCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get classesCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get currentIndexStartOffsetCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get currentIndexEndOffsetCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get focusDelayCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get focusDurationCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get disabledCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get hibernatedCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get currentScrollValue(): number;
    get targetScrollValue(): number;
    get contentElement(): HTMLElement;
    get sections(): ScrollSection[];
    get position(): number;
    get contentPosition(): number;
    get viewportSize(): number;
    get scrollSize(): number;
    get gap(): number;
    get counter(): Store<number, keyof import('../store').StoreManagers>;
    get limit(): number;
    get distance(): number;
    get loopDistance(): number;
    get overscroll(): number;
    get vertical(): boolean;
    get currentProgress(): number;
    get targetProgress(): number;
    get scrollWidth(): number;
    get scrollHeight(): number;
    onScroll(...parameters: Parameters<Damped['subscribe']>): () => void;
    offScroll(...parameters: Parameters<Damped['unsubscribe']>): void;
    range(from: number, distance: number, margin?: number): number;
    curve(from: number, distance: number, margin?: number): number;
    visible(from: number, distance: number, margin?: number): boolean;
    scrollToSection(sectionIndex: number, options?: ScrollSetOptions): void;
    shiftSections(step: number, options?: ScrollSetOptions): void;
    setPosition(value: number, options?: ScrollSetOptions): void;
    shiftPosition(value: number, options?: ScrollSetOptions): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-scroll': ScrollElement;
    }
    interface HTMLElementEventMap {
        sectionsChange: CustomEvent;
    }
}
