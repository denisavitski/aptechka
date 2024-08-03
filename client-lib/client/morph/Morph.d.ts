import { ChangeHistoryAction } from '../utils';
import { Link } from './Link';

export interface MorphParameters {
    base?: string;
    waitForHeadToLoad?: boolean;
    cachePages?: boolean;
}
export interface MorphNavigationEntry {
    pathname: string;
    isCached: boolean;
}
export interface MorphPreprocessorEntry extends MorphNavigationEntry {
    resolve: () => void;
    reject: () => void;
}
export type MorphPreprocessor = (entry: MorphPreprocessorEntry) => void;
export type MorphNavigationCallback = (entry: MorphNavigationEntry) => void;
export type MorphPostprocessor = MorphNavigationCallback;
export declare class Morph {
    #private;
    preprocessor?: MorphPreprocessor;
    postprocessor?: MorphPostprocessor;
    constructor(parameters?: MorphParameters);
    get currentPathname(): string;
    get links(): Link[];
    normalizePath(path: string): {
        leaf: string;
        pathname: string;
        parameters: string;
        hash: string;
    };
    beforeNavigationEvent(callback: MorphNavigationCallback): () => void;
    afterNavigationEvent(callback: MorphNavigationCallback): () => void;
    prefetch(path: string): Promise<Document>;
    navigate(path: string, historyAction?: ChangeHistoryAction): Promise<void>;
}
