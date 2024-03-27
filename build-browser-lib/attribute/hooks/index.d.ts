import { Attribute, AttributeOptions } from '..';
export declare function createAttribute<T extends number | string | boolean>(name: string, defaultValue: T, options?: AttributeOptions<T>): Attribute<T>;
