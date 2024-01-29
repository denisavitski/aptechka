export type ProviderCallback = (...args: any[]) => void;
export declare class Notifier<Callback extends ProviderCallback = ProviderCallback> {
    #private;
    close(): void;
    subscribe(callback: Callback, order?: number): () => void;
    unsubscribe(callback: Callback): void;
    notify(...parameters: Parameters<Callback>): void;
}
