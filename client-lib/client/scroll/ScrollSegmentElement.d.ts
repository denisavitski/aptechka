import { CSSProperty } from '../css-property';
import { Store } from '../store';
import { ScrollUserElement } from './ScrollUserElement';
import { Damped } from '../animation';

export interface ScrollSegmentResizeDetail {
    start: number;
    distance: number;
    finish: number;
}
export declare class ScrollSegmentElement extends ScrollUserElement {
    #private;
    constructor();
    get distanceOffsetCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get startOffsetCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get captureOnceCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get capturedCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get releasedCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get capturedFromStartCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get capturedFromFinishCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get releasedFromStartCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get releasedFromFinishCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get passedVarCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get progressVarCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get distanceVarCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get startVarCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get finishVarCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get disabledCSSProperty(): CSSProperty<boolean, keyof import('../store').StoreManagers>;
    get dampingCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get massCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get stiffnessCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get targetCSSProperty(): CSSProperty<string, keyof import('../store').StoreManagers>;
    get isCaptured(): Store<boolean, keyof import('../store').StoreManagers>;
    get isReleased(): Store<boolean, keyof import('../store').StoreManagers>;
    get isCapturedFromStart(): Store<boolean, keyof import('../store').StoreManagers>;
    get isReleasedFromStart(): Store<boolean, keyof import('../store').StoreManagers>;
    get isCapturedFromFinish(): Store<boolean, keyof import('../store').StoreManagers>;
    get isReleasedFromFinish(): Store<boolean, keyof import('../store').StoreManagers>;
    get directionPosition(): number;
    get directionSize(): number;
    get passed(): Damped;
    get progress(): number;
    get start(): number;
    get finish(): number;
    get distance(): number;
    get isCapturedOnce(): boolean;
    get isDisabled(): boolean;
    resize(): void;
    tick(): void;
    disable(): void;
    enable(): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected removeVar(name: string | undefined): void;
    protected setVar(name: string | undefined, value: string | number): void;
    protected getDistance(): number;
    protected getStart(): number;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-scroll-segment': ScrollSegmentElement;
    }
}
