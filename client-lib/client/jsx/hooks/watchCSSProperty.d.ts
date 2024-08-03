import { CSSProperty, CSSPropertyOptions } from '../../css-property';
import { StoreManagerType } from '../../store';
import { ElementOrSelector } from '../../utils';

export declare function watchCSSProperty<StoreType extends number | boolean | string, StoreManager extends StoreManagerType = StoreManagerType>(property: string, defaultValue: StoreType, options?: CSSPropertyOptions<StoreType, StoreManager> & {
    elementOrSelector?: ElementOrSelector<HTMLElement>;
}): CSSProperty<StoreType, StoreManager>;
