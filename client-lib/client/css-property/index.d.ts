import { Store, StoreCallback, StoreManagerType, StoreOptions } from '../store';
import { ElementOrSelector } from '../utils';

export interface CSSPropertyOptions<StoreType extends number | boolean | string, StoreManager extends StoreManagerType = StoreManagerType> extends StoreOptions<StoreType, StoreManager> {
    rawValueCheck?: boolean;
}
export declare class CSSProperty<StoreType extends number | boolean | string, StoreManager extends StoreManagerType = StoreManagerType> extends Store<StoreType, StoreManager> {
    #private;
    constructor(elementOrSelector: ElementOrSelector<HTMLElement>, property: string, defaultValue: StoreType, options?: CSSPropertyOptions<StoreType, StoreManager>);
    get currentRawValue(): string;
    observe(): void;
    unobserve(): void;
    subscribe(callback: StoreCallback<StoreType>): () => void;
    unsubscribe(callback: StoreCallback<StoreType>): void;
    close(): void;
    check(): void;
}
