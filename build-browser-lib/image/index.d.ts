import { SourceElement } from '../source';
export declare class ImageElement extends SourceElement<HTMLImageElement> {
    protected createConsumer(): HTMLImageElement;
    protected consumeSource(url: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-image': ImageElement;
    }
}
