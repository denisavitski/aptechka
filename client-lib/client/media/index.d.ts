import { Store } from '../store';

export type MediaCallback = () => void;
export type MediaQueries<T extends string = string> = Map<T, {
    match: MediaCallback;
    unmatch?: MediaCallback;
}>;
export declare class Media extends Store<boolean> {
    #private;
    constructor(query: string);
    close(): void;
}
