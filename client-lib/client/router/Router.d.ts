import { splitPath, ChangeHistoryAction } from '../utils';
import { Route, RouteModule } from './Route';
import { Link } from './Link';

export interface RouterPreprocessorEntry {
    path: ReturnType<typeof splitPath>;
    resolve: () => void;
    reject: () => void;
}
export type RouterPreprocessor = (entry: RouterPreprocessorEntry) => void;
export interface RouterPostprocessorEntry {
    pathname: string;
}
export type RouterPostprocessor = (entry: RouterPostprocessorEntry) => void;
export interface RouterAfterNavigationEntry {
    pathname: string;
}
export type RouterAfterNavigationCallback = (entry: RouterAfterNavigationEntry) => void;
export interface RouterParameters {
    rootElement?: HTMLElement;
    base?: string;
}
export declare class Router {
    #private;
    preprocessor?: RouterPreprocessor;
    postprocessor?: RouterPostprocessor;
    constructor(parameters?: RouterParameters);
    get currentPathname(): string;
    get candidatePathname(): string | undefined;
    get routes(): Route[];
    get links(): Link[];
    navigationEvent(callback: RouterAfterNavigationCallback): () => void;
    defineRoute(pattern: string, module: RouteModule): void;
    navigate(path: string, action?: ChangeHistoryAction): Promise<void>;
    normalizePath(path: string): {
        leaf: string;
        pathname: string;
        parameters: string;
        hash: string;
    };
}
