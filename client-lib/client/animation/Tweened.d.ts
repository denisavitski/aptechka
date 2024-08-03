import { TickerCallbackEntry } from '../ticker';
import { EasingFunction } from '../utils';
import { Animation, AnimationConstructorOptions, AnimationOptions } from './Animation';

export interface TweenedOptions extends AnimationOptions {
    easing?: EasingFunction;
    duration?: number;
}
export declare class Tweened extends Animation<TweenedOptions> {
    #private;
    constructor(initial?: number, options?: AnimationConstructorOptions<TweenedOptions>);
    updateOptions(options?: TweenedOptions): void;
    protected handleAnimationFrame(e: TickerCallbackEntry): void;
    protected start(): void;
}
