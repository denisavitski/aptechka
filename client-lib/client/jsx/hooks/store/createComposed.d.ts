import { Composed } from '../../../store';

export declare function createComposed<ComposedType>(...parameters: ConstructorParameters<typeof Composed<ComposedType>>): Composed<ComposedType>;
