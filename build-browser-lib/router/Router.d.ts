import { Route, RouteModule } from './Route';
export interface RouterPreprocessorEntry {
    pathname: string;
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
export type RouterHistoryAction = 'push' | 'replace' | 'none';
export interface RouterParameters {
    rootElement?: HTMLElement;
    base?: string;
}
export declare class Router {
    #private;
    static active: Router;
    preprocessor?: RouterPreprocessor;
    postprocessor?: RouterPostprocessor;
    constructor(parameters?: RouterParameters);
    get currentPathname(): string;
    get candidatePathname(): string | undefined;
    get routes(): Route[];
    navigationEvent(callback: RouterAfterNavigationCallback): () => void;
    defineRoute(pattern: string, module: RouteModule): void;
    navigate(pathname: string, action?: RouterHistoryAction): Promise<void>;
}
