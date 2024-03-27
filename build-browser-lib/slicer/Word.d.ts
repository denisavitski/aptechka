import { Letter } from './Letter';
export interface WordParameters {
    index: number;
    text: string;
    letters?: boolean;
    lettersAcc?: number;
    letterConstructor?: typeof Letter;
    clone?: boolean;
}
export declare class Word {
    #private;
    constructor(parameters: WordParameters);
    get index(): number;
    get element(): HTMLSpanElement;
    get letters(): Letter[];
}
