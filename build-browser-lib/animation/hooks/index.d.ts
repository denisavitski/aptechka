import { ElementOrSelector } from '../../utils';
import { Damped, DampedOptions, Tweened, TweenedOptions } from '..';
export declare function createTweened(initialValue?: number, options?: Omit<TweenedOptions, ''> & {
    culling?: ElementOrSelector | boolean;
}): Tweened;
export declare function createDamped(initialValue?: number, options?: Omit<DampedOptions, ''> & {
    culling?: ElementOrSelector | boolean;
}): Damped;
