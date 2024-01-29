export declare class Source {
    #private;
    constructor(url: string);
    get url(): string;
    get name(): string;
    get density(): number;
    get query(): string;
    get extension(): string;
    get queryType(): "min" | "max";
    get queryPx(): number;
}
