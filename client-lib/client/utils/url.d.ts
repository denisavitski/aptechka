export declare function splitPath(value: string, base?: string): {
    leaf: string;
    pathname: string;
    parameters: string;
    hash: string;
};
export declare function normalizeBase(base: string): string;
export type ChangeHistoryAction = 'replace' | 'push' | 'none';
export declare function changeHistory(action: ChangeHistoryAction, pathname: string, parameters?: string | undefined, hash?: string | undefined): void;
