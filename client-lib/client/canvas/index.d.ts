import { CSSProperty } from '../css-property';

export interface Canvas2DRenderDetail {
    pixelRatio: number;
    width: number;
    height: number;
    element: HTMLElement;
    canvasElement: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    timestamp: number;
    timeBetweenFrames: number;
}
export type CanvasRenderEvent = CustomEvent<Canvas2DRenderDetail>;
export declare class CanvasElement extends HTMLElement {
    #private;
    constructor();
    get fpsCSSProperty(): CSSProperty<number, keyof import('../store').StoreManagers>;
    get canvasElement(): HTMLCanvasElement;
    get context(): CanvasRenderingContext2D;
    get pixelRatio(): number;
    get width(): number;
    get height(): number;
    get detail(): Canvas2DRenderDetail;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-canvas': CanvasElement;
    }
    interface HTMLElementEventMap {
        canvasRender: CanvasRenderEvent;
        canvasResize: CanvasRenderEvent;
    }
}
