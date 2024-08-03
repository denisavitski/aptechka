import { SourceManager } from './SourceManager';
import { ClassLinkedStatus } from '../class-linked-status';

export declare abstract class SourceElement<T extends HTMLElement> extends HTMLElement {
    #private;
    constructor();
    get consumerElement(): T;
    get sourceManager(): SourceManager;
    get status(): ClassLinkedStatus<{
        loading: false;
        loaded: false;
        error: false;
    }>;
    get isLazy(): boolean;
    protected abstract createConsumer(): T;
    protected abstract consumeSource(url: string | null): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementEventMap {
        sourceCapture: CustomEvent;
        sourceRelase: CustomEvent;
    }
}
