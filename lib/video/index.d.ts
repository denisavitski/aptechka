import { SourceElement } from '../source';
export declare class VideoElement extends SourceElement<HTMLVideoElement> {
    protected connectedCallback(): void;
    protected createConsumer(): HTMLVideoElement;
    protected consumeSource(url: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-video': VideoElement;
    }
}
