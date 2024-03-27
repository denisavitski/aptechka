import { CustomElement } from '../custom-element';
export interface Canvas2DRenderDetail {
    pixelRatio: number;
    width: number;
    height: number;
    element: HTMLElement;
    canvasElement: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    timestamp: number;
    elapsed: number;
}
export type Canvas2DRenderCallback = (entry: Canvas2DRenderDetail) => void;
export declare class CanvasElement extends CustomElement {
    #private;
    constructor();
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
        canvasRender: CustomEvent<Canvas2DRenderDetail>;
    }
}
