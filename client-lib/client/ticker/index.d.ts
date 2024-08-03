import { ElementOrSelector } from '../utils';

export interface TickerCallbackEntry {
    timestamp: number;
    subscribeTimestamp: number;
    timeBetweenFrames: number;
    timeElapsedSinceSubscription: number;
}
export type TickerCallback = (entry: TickerCallbackEntry) => void;
export interface TickerAddOptions {
    maxFPS?: number;
    order?: number;
    culling?: ElementOrSelector | false | undefined | null;
}
export declare class Ticker {
    #private;
    constructor();
    subscribe(callback: TickerCallback, options?: TickerAddOptions): () => void;
    unsubscribe(callback: TickerCallback): void;
    destroy(): void;
}
export declare const ticker: Ticker;
