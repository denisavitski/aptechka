export interface LetterParameters {
    index: number;
    text: string;
    clone?: boolean;
}
export declare class Letter {
    #private;
    constructor(parameters: LetterParameters);
    get index(): number;
    get element(): HTMLSpanElement;
}
