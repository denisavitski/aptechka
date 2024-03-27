import { CustomElement } from '../custom-element';
import { Notifier } from '../notifier';
export interface SourceConsumer extends HTMLElement {
    src: string | null;
}
export declare abstract class SourceElement<T extends SourceConsumer> extends CustomElement {
    #private;
    constructor();
    get consumerElement(): T;
    get captureEvent(): Notifier<import('../notifier').ProviderCallback>;
    get releaseEvent(): Notifier<import('../notifier').ProviderCallback>;
    protected abstract createConsumer(): T;
    protected abstract consumeSource(url: string | null): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
