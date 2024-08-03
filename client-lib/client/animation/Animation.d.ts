import { Store, StoreOptions } from '../store';
import { TickerAddOptions, TickerCallbackEntry } from '../ticker';

export interface AnimationOptions extends TickerAddOptions {
    min?: number;
    max?: number;
    equalize?: boolean;
    restart?: boolean;
}
export type AnimationConstructorOptions<Options extends AnimationOptions> = StoreOptions<number, 'number'> & Options;
export declare abstract class Animation<Options extends AnimationOptions = AnimationOptions> extends Store<number, 'number'> {
    #private;
    constructor(initial?: number, options?: StoreOptions<number, 'number'>);
    get direction(): number;
    get target(): number;
    get min(): number;
    set min(value: number);
    get max(): number;
    set max(value: number);
    get from(): number;
    get isRunning(): Store<boolean, keyof import('../store').StoreManagers>;
    get delta(): number;
    get deltaProgress(): number;
    get distance(): number;
    get distanceProgress(): number;
    set(value: number, options?: Options): void;
    shift(value: number, options?: Options): void;
    reset(): void;
    close(): void;
    listenAnimationFrame(): void;
    unlistenAnimationFrame(): void;
    updateOptions(options?: AnimationOptions): void;
    protected start(): void;
    protected abstract handleAnimationFrame(e: TickerCallbackEntry): void;
}
