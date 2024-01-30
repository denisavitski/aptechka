import { CustomElement } from '../custom-element';
import { Attribute } from '../attribute';
export declare class AccordionElement extends CustomElement {
    #private;
    get axisAttribute(): Attribute<"y">;
    get multipleAttribute(): Attribute<false>;
}
