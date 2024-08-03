import { Store } from '../store';
import { Source } from './SourceClass';

export type SourceManagerSourceSet = string | Array<string>;
export interface SourceManagerParameters {
    srcset: SourceManagerSourceSet;
}
export declare class SourceManager extends Store<Source | undefined> {
    #private;
    constructor(parameters: SourceManagerParameters);
    close(): void;
    connect(): void;
    disconnect(): void;
}
