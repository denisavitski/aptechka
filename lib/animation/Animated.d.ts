import { StoreOptions, StoreEntry, Store } from '../store';
import { TickerCallbackEntry, TickerAddOptions } from '../ticker';
export interface AnimatedOptions extends StoreOptions<number>, TickerAddOptions {
    min?: number | AnimatedEdgeFunction;
    max?: number | AnimatedEdgeFunction;
}
export type AnimatedEdgeFunction = () => number;
export interface AnimatedEntry extends StoreEntry<number> {
    min: number;
    max: number;
    delta: number;
    progress: number;
    direction: number;
    speed: number;
}
export declare abstract class Animated<Entry extends AnimatedEntry = AnimatedEntry> extends Store<number, Entry> {
    #private;
    constructor(options?: AnimatedOptions);
    get target(): number;
    get isRunning(): Store<boolean, StoreEntry<boolean>>;
    get direction(): number;
    get maxFPS(): number | undefined;
    get speed(): number;
    get min(): number;
    set min(value: number | AnimatedEdgeFunction | undefined);
    get max(): number;
    set max(value: number | AnimatedEdgeFunction | undefined);
    get delta(): number;
    get progress(): number;
    get entry(): Entry;
    get setter(): Animated | undefined;
    set setter(animated: Animated | undefined);
    set(value: number, equalize?: boolean): void;
    shift(value: number, equalize?: boolean): void;
    close(): void;
    reset(): void;
    listenAnimationFrame(): void;
    unlistenAnimationFrame(): void;
    protected abstract update(): void;
    protected abstract handleAnimationFrame(e: TickerCallbackEntry): void;
}
