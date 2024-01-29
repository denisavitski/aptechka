export declare function isObject(value: any): value is object;
export declare function cloneDeep<T>(obj: T): T;
export declare function mergeDeep(target: object, source: object, isObjectFunction?: typeof isObject): object;
export declare function isNullish(value: any): boolean;
export declare function compareObjects(obj1: any, obj2: any): boolean;
export declare function pick<T extends object, R extends keyof T>(object: T, keys: Array<R>): Pick<T, R>;
export declare function omit<T extends object, R extends keyof T>(object: T, keys: Array<R>): Omit<T, R>;
