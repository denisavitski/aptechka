import { SourceElement } from '../source';

export interface ReadyStateChangeEventDetail {
    readyState: number;
    progress: number;
}
export type ReadyStateChangeEvent = CustomEvent<ReadyStateChangeEventDetail>;
export declare class VideoElement extends SourceElement<HTMLVideoElement> {
    #private;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
    protected createConsumer(): HTMLVideoElement;
    protected consumeSource(url: string | null): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-video': VideoElement;
    }
    interface HTMLElementEventMap {
        readyStateChange: ReadyStateChangeEvent;
    }
}
