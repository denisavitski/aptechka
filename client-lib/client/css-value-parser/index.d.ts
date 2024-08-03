declare class CSSValueParser {
    static CSS_UNITS: Set<string>;
    parse(value: string, element?: HTMLElement): any;
}
export declare const cssValueParser: CSSValueParser;
export {};
