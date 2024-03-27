import { TickerAddOptions, TickerCallback } from '..';
import { ElementOrSelector } from '../../utils';
export declare function onAnimationFrame(callback: TickerCallback, options?: Omit<TickerAddOptions, 'culling'> & {
    culling?: ElementOrSelector | boolean;
}): void;
