import { ElementOrSelector } from '../../utils';
import { En3SourceConsumer } from '../objects/En3SourceConsumer';
declare class En3LazyLoader {
    add(consumer: En3SourceConsumer<any>, element: ElementOrSelector): (() => void) | undefined;
}
export declare const en3LazyLoader: En3LazyLoader;
export {};
