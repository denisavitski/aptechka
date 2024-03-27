import { Store } from '../../store';
import { CustomElement } from '../../custom-element';
import { StoreManagerType } from '../../store/Store';
export interface TweakerFieldParameters {
    store: Store<any, StoreManagerType, any>;
}
export declare class TweakerFieldElement extends CustomElement {
    #private;
    constructor(parameters: TweakerFieldParameters);
    get key(): string;
    get name(): string;
    get stores(): Store<any, keyof import('../../store').StoreManagers, any>[];
    addStore(store: Store<any, any, any>): void;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-field': TweakerFieldElement;
    }
}
