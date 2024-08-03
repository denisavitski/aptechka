import { Store } from '../store';
import { StoreManagerType } from '../store/Store';

export interface TweakerFieldParameters {
    store: Store<any, StoreManagerType>;
}
export declare class TweakerFieldElement extends HTMLElement {
    #private;
    constructor(parameters: TweakerFieldParameters);
    get key(): string;
    get name(): string;
    get stores(): Store<any, keyof import('../store').StoreManagers>[];
    addStore(store: Store<any, any>): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-field': TweakerFieldElement;
    }
}
