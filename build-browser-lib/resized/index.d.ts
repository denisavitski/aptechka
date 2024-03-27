import { Store, StoreOptions } from '../store';
import { ElementOrSelector } from '../utils';
export interface ResizedOptions extends StoreOptions<number, 'number'> {
    dispatcher?: ElementOrSelector;
}
export type ResizedCallback = () => number;
export declare class Resized extends Store<number, 'number'> {
    #private;
    constructor(callback: ResizedCallback, options?: ResizedOptions);
    close(): void;
}
