import { Ladder } from '../ladder';
import { StoreCallback, StoreEntry } from '../store';
import { ElementOrSelector, Axes3D, Axes2D } from '../utils';
export declare function decomposeCSSMatrix(matrix: WebKitCSSMatrix): {
    scaleX: number;
    scaleY: number;
    scaleZ: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
    translationX: number;
    translationY: number;
    translationZ: number;
};
export interface LayoutBoxOptions {
    containerElement?: ElementOrSelector;
    cartesian?: boolean;
    scrollAxis?: Axes3D | 'auto';
    frontSide?: LayoutBoxFrontSide;
    sizeStep?: boolean;
    positionStep?: boolean;
    culling?: boolean;
}
export interface LayoutBoxScrollStepCallbackReturn {
    axis: Axes2D;
    value: number;
}
export type LayoutBoxXYZ = {
    x: number;
    y: number;
    z: number;
};
export type LayoutBoxScrollStepCallback = () => LayoutBoxScrollStepCallbackReturn;
export type LayoutBoxStepCallback = StoreCallback<StoreEntry<LayoutBoxXYZ>>;
export type LayoutBoxFrontSide = 'left' | 'top';
export interface LayoutBoxBindedObject {
    position?: LayoutBoxXYZ;
    scale?: LayoutBoxXYZ;
    rotation?: LayoutBoxXYZ;
}
export declare class LayoutBox {
    #private;
    constructor(element: ElementOrSelector, options?: LayoutBoxOptions);
    get element(): HTMLElement;
    get containerElement(): HTMLElement;
    get position(): {
        x: number;
        y: number;
        z: number;
    };
    get rotation(): {
        x: number;
        y: number;
        z: number;
    };
    get scale(): {
        x: number;
        y: number;
        z: number;
    };
    get left(): number;
    get top(): number;
    get front(): number;
    get width(): number;
    get height(): number;
    get depth(): number;
    bindObject(object: LayoutBoxBindedObject): void;
    unbindObject(object: LayoutBoxBindedObject): void;
    setScrollStep(callback: LayoutBoxScrollStepCallback): () => void;
    deleteScrollStep(callback: LayoutBoxScrollStepCallback): void;
    destroy(): void;
    setPositionStep(...args: Parameters<Ladder['setStep']>): void;
    setRotationStep(...args: Parameters<Ladder['setStep']>): void;
    setScaleStep(...args: Parameters<Ladder['setStep']>): void;
    deletePositionStep(...args: Parameters<Ladder['deleteStep']>): void;
    deleteRotationStep(...args: Parameters<Ladder['deleteStep']>): void;
    deleteScaleStep(...args: Parameters<Ladder['deleteStep']>): void;
}
