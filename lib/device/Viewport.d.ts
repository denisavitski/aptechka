import { Store } from '../store';
export declare enum ViewportBreakpoints {
    'mobile' = "600px",
    'tablet' = "1024px",
    'notebook' = "1280px",
    'desktop' = "1281px"
}
export declare enum ViewportMediaRules {
    '<=mobile' = "(max-width: 600px)",
    '>=mobile' = "(min-width: 601px)",
    '<=tablet' = "(max-width: 1024px)",
    '>=tablet' = "(min-width: 1025px)",
    '<=notebook' = "(max-width: 1280px)",
    '>=notebook' = "(min-width: 1281px)",
    '<=desktop' = "(max-width: 1280px)",
    '>=desktop' = "(min-width: 1281px)"
}
declare class Viewport {
    #private;
    constructor();
    get width(): number;
    get height(): number;
    get store_type(): Store<"mobile" | "tablet" | "notebook" | "desktop" | undefined, import('../store').StoreEntry<"mobile" | "tablet" | "notebook" | "desktop" | undefined>>;
    get pixelRatio(): number;
}
export declare const viewport: Viewport;
export {};
