import { CustomElement } from '../custom-element';
import { Notifier } from '../notifier';
export interface Canvas2DRenderEntry {
    pixelRatio: number;
    width: number;
    height: number;
    element: HTMLElement;
    canvasElement: HTMLElement;
    context: CanvasRenderingContext2D;
    timestamp: number;
    elapsed: number;
}
export type Canvas2DRenderCallback = (entry: Canvas2DRenderEntry) => void;
export declare class Canvas2DElement extends CustomElement {
    #private;
    get renderEvent(): Notifier<Canvas2DRenderCallback>;
    get canvasElement(): HTMLCanvasElement;
    get context(): CanvasRenderingContext2D;
    get pixelRatio(): number;
    get width(): number;
    get height(): number;
    get detail(): Canvas2DRenderEntry;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'canvas-2d': Canvas2DElement;
    }
}
