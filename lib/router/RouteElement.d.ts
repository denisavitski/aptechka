import { CustomElement } from '../custom-element';
export type RouteURLParams<T extends string = string> = Partial<{
    [key in T]: string;
}>;
export type RouteParameters<PathnameParams extends string = string, SearchParams extends string = string> = {
    pathnameParams: RouteURLParams<PathnameParams>;
    searchParams: RouteURLParams<SearchParams>;
};
export declare class RouteElement<PathnameParams extends string = string, SearchParams extends string = string> extends CustomElement {
    #private;
    constructor(parameters: RouteParameters<PathnameParams, SearchParams>);
    get pathnameParams(): Partial<{ [key in PathnameParams]: string; }>;
    get searchParams(): Partial<{ [key in SearchParams]: string; }>;
}
