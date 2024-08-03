import { TickerCallbackEntry } from '../ticker';
import { Animation, AnimationConstructorOptions, AnimationOptions } from './Animation';

export interface DampedOptions extends AnimationOptions {
    stiffness?: number;
    damping?: number;
    mass?: number;
}
export declare class Damped extends Animation<DampedOptions> {
    #private;
    damping: number;
    stiffness: number;
    mass: number;
    constructor(initial?: number, options?: AnimationConstructorOptions<DampedOptions>);
    get velocity(): number;
    get speed(): number;
    updateOptions(options?: DampedOptions): void;
    protected handleAnimationFrame(e: TickerCallbackEntry): void;
}
