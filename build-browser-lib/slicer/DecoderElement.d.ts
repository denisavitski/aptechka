import { SlicerElement } from './SlicerElement';
export declare class DecoderElement extends SlicerElement {
    constructor();
    play(progress: number): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-decoder': DecoderElement;
    }
}
