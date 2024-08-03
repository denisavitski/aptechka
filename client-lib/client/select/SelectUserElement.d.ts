import { SelectElement } from './SelectElement';

export declare class SelectUserElement extends HTMLElement {
    #private;
    get selectElement(): SelectElement;
    protected connectedCallback(): void;
}
