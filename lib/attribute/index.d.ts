import { Store, StoreOptions } from '../store';
import { ElementOrSelector } from '../utils';
export declare class Attribute<T extends string | number | boolean> extends Store<T> {
    #private;
    constructor(elementOrSelector: ElementOrSelector, name: string, defaultValue: T, options?: StoreOptions<T>);
    unobserve(): void;
    observe(): void;
}
