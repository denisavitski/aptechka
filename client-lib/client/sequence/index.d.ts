import { CanvasElement } from '../canvas';
import { SourceElement, SourceManagerSourceSet } from '../source';

export interface SequenceElementParameters {
    srcset: SourceManagerSourceSet;
    pad?: number;
}
export declare class SequenceElement extends SourceElement<CanvasElement> {
    #private;
    constructor(parameters?: SequenceElementParameters);
    setProgress(value: number): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected createConsumer(): CanvasElement;
    protected consumeSource(url: string | null): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-sequence': SequenceElement;
    }
}
