export type RouteModule = () => Promise<any>;
export type RouteURLParams<T extends string = string> = Partial<{
    [key in T]: string;
}>;
export type RouteParameters<PathnameParams extends string = string, SearchParams extends string = string> = {
    pathnameParams: RouteURLParams<PathnameParams>;
    searchParams: RouteURLParams<SearchParams>;
};
export declare class Route {
    #private;
    constructor(pattern: string, module: RouteModule);
    get pattern(): string;
    get urlPattern(): URLPattern;
    get isActive(): boolean;
    get element(): HTMLElement | null;
    get nest(): HTMLElement | ShadowRoot | null;
    testPathname(pathname: string): boolean;
    render(containerElement: HTMLElement | ShadowRoot, pathname: string): Promise<void>;
    close(): void;
    getAnchorElements(): HTMLAnchorElement[];
}
