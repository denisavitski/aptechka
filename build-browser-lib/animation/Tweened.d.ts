import { Store, StoreEntry, StoreOptions } from '../store';
import { TickerAddOptions } from '../ticker';
import { EasingFunction } from '../utils';
export interface TweenedAnimationOptions extends TickerAddOptions {
    easing?: EasingFunction;
    duration?: number;
}
export interface TweenedSetOptions extends TweenedAnimationOptions {
    restart?: boolean;
}
export interface TweenedOptions extends TweenedAnimationOptions, StoreOptions<number> {
}
export interface TweenedEntry extends StoreEntry<number> {
    length: number;
    progress: number;
    direction: number;
}
export declare class Tweened extends Store<number, 'number', TweenedEntry> {
    #private;
    constructor(initial?: number, options?: TweenedOptions);
    get isRunning(): Store<boolean, keyof import('../store').StoreManagers, StoreEntry<boolean>>;
    get direction(): number;
    get length(): number;
    get progress(): number;
    get entry(): TweenedEntry;
    set(value: number, options?: TweenedSetOptions): void;
    shift(value: number, options?: TweenedSetOptions): void;
    reset(): void;
    close(): void;
}
