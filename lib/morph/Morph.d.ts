export type MorphHistoryAction = 'replace' | 'push' | 'none';
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
    beforeNavigationEvent(callback: MorphNavigationCallback): () => void;
    afterNavigationEvent(callback: MorphNavigationCallback): () => void;
    navigate(pathname: string, historyAction?: MorphHistoryAction): Promise<void>;
}
