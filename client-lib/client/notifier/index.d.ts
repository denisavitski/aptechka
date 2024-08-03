export type NotifierCallback = (...args: any[]) => void;
export declare class Notifier<Callback extends NotifierCallback = NotifierCallback> {
    #private;
    close(): void;
    subscribe(callback: Callback, order?: number): () => void;
    unsubscribe(callback: Callback): void;
    notify(...parameters: Parameters<Callback>): void;
}
