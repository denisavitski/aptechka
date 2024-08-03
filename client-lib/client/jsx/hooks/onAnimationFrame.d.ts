import { TickerAddOptions, TickerCallback } from '../../ticker';
import { ElementOrSelector } from '../../utils';

export declare function onAnimationFrame(callback: TickerCallback, options?: Omit<TickerAddOptions, 'culling'> & {
    culling?: ElementOrSelector | boolean;
}): void;
