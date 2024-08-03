import { Attribute, AttributeOptions } from '../../attribute';
import { ElementOrSelector } from '../../utils';

export declare function watchAttribute<T extends string | number | boolean>(name: string, defaultValue: T, options?: AttributeOptions<T> & {
    elementOrSelector?: ElementOrSelector<HTMLElement>;
}): Attribute<T>;
