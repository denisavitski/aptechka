export type ContextCallback<T> = (context: T) => void | (() => void);
export declare function onContext<T>(name: string, callback: ContextCallback<T>): void;
export declare function createContext(name: string, value: any): void;
