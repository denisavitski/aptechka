import { TickerCallbackEntry } from '../ticker';
import { EasingFunction } from '../utils';
import { AnimatedOptions, Animated } from './Animated';
export interface TweenedOptions extends AnimatedOptions {
    easing?: EasingFunction;
}
export declare class Tweened extends Animated {
    easing: EasingFunction;
    constructor(options?: TweenedOptions);
    start(): void;
    pause(): void;
    stop(): void;
    get max(): number;
    protected update(): void;
    protected handleAnimationFrame(e: TickerCallbackEntry): void;
}
