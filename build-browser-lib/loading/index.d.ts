import { Notifier } from '../notifier';
export interface LoadingProgressDetail {
    loaded: number;
    total: number;
    progress: number;
    namespace: string;
}
export interface LoadingErrorDetail {
    namespace: string;
    url: string;
}
export interface LoadingCompleteDetail {
    total: number;
}
export type LoadingProgressSubscriber = (detail: LoadingProgressDetail) => void;
export type LoadingErrorSubscriber = (detail: LoadingErrorDetail) => void;
export type LoadingCompleteSubscriber = (detail: LoadingCompleteDetail) => void;
declare class Loading {
    #private;
    get progressEvent(): Notifier<LoadingProgressSubscriber>;
    get completeEvent(): Notifier<LoadingCompleteSubscriber>;
    get errorEvent(): Notifier<LoadingErrorSubscriber>;
    get _counter(): Map<string, {
        total: number;
        loaded: number;
    }>;
    get isComplete(): boolean;
    reset(): void;
    setTotal(namespace: string, total?: number): void;
    setLoaded(namespace: string, loaded?: number): void;
    setError(namespace: string, url: string): void;
    getStats(): {
        loaded: number;
        total: number;
    };
}
export declare const loading: Loading;
export {};
