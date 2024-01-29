import { RouteElement } from './RouteElement';
export type RouteModule = () => Promise<any>;
export declare class Route {
    #private;
    constructor(pattern: string, module: RouteModule);
    get pattern(): string;
    get urlPattern(): URLPattern;
    get isActive(): boolean;
    get element(): RouteElement<string, string> | null;
    get outlet(): HTMLElement | ShadowRoot | null;
    testPathname(pathname: string): boolean;
    render(containerElement: HTMLElement | ShadowRoot, pathname: string): Promise<void>;
    close(): void;
    getAnchorElements(): HTMLAnchorElement[];
}
