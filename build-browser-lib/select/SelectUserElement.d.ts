import { CustomElement } from '../custom-element';
import { SelectElement } from './SelectElement';
export declare class SelectUserElement extends CustomElement {
    #private;
    get selectElement(): SelectElement;
    protected connectedCallback(): void;
}
