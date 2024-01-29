import { TickerCallbackEntry } from '../ticker';
import { AnimatedOptions, Animated } from './Animated';
export interface DampedOptions extends AnimatedOptions {
    damping?: number;
}
export declare class Damped extends Animated {
    damping: number;
    constructor(options?: DampedOptions);
    protected update(): void;
    protected handleAnimationFrame(e: TickerCallbackEntry): void;
}
