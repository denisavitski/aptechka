import { Word } from './Word.js';
import { Letter } from './Letter.js';

export interface SlicerParameters {
    wordConstructor?: typeof Word;
    letterConstructor?: typeof Letter;
}
export declare class SlicerElement extends HTMLElement {
    #private;
    constructor(parameters?: SlicerParameters);
    get wordsArray(): Word[];
    get lettersArray(): Letter[];
    get originalText(): string;
    protected connectedCallback(): void;
    protected disconnectedCallback(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'e-slicer': SlicerElement;
    }
}
