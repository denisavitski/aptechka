import { Store } from '../store';
import { TweakerFieldElement } from './TweakerFieldElement';
import { StoreBox } from './TweakerElement';

export interface TweakerFolderParameters {
    key: string;
    storeBox?: StoreBox;
}
export declare class TweakerFolderElement extends HTMLElement {
    #private;
    constructor(parameters: TweakerFolderParameters);
    get key(): string;
    get head(): Store<any, keyof import('../store').StoreManagers>;
    get content(): Store<(TweakerFieldElement | TweakerFolderElement)[], keyof import('../store').StoreManagers>;
    get bodyElement(): HTMLElement;
    get contentElement(): HTMLElement;
    protected connectedCallback(): void;
    protected handleStore(storeBox: StoreBox): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-tweaker-folder': TweakerFolderElement;
    }
}
