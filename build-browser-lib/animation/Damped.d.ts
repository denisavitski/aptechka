import { Store, StoreEntry, StoreOptions } from '../store';
import { TickerAddOptions } from '../ticker';
export interface DampedOptions extends TickerAddOptions, StoreOptions<number> {
    damping?: number;
    min?: number;
    max?: number;
}
export interface DampedEntry extends StoreEntry<number> {
    min: number;
    max: number;
    length: number;
    progress: number;
    direction: number;
    speed: number;
}
export declare class Damped extends Store<number, 'number', DampedEntry> {
    #private;
    constructor(initial?: number, options?: DampedOptions);
    get target(): number;
    get isRunning(): Store<boolean, keyof import('../store').StoreManagers, StoreEntry<boolean>>;
    get direction(): number;
    get maxFPS(): number | undefined;
    get speed(): number;
    get min(): number;
    set min(value: number);
    get max(): number;
    set max(value: number);
    get length(): number;
    get progress(): number;
    get damping(): number;
    set damping(value: number);
    get entry(): DampedEntry;
    set(value: number, equalize?: boolean): void;
    shift(value: number, equalize?: boolean): void;
    close(): void;
    reset(): void;
    stopAnimation(): void;
}
