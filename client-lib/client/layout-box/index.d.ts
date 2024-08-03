import { Ladder } from '../ladder';
import { StoreCallback } from '../store';
import { ElementOrSelector, Axes3D, Axes2D } from '../utils';
import { Notifier } from '../notifier';

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
    containerElement?: ElementOrSelector<HTMLElement>;
    cartesian?: boolean;
    scrollAxis?: Axes3D | 'auto';
    frontSide?: LayoutBoxFrontSide;
    sizeStep?: boolean;
    positionStep?: boolean;
    culling?: boolean;
    transformStep?: boolean;
    scrollStep?: boolean;
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
export type LayoutBoxStepCallback = StoreCallback<LayoutBoxXYZ>;
export type LayoutBoxFrontSide = 'left' | 'top';
export interface LayoutBoxBindedObject {
    position?: LayoutBoxXYZ;
    scale?: LayoutBoxXYZ;
    rotation?: LayoutBoxXYZ;
}
export type LayoutBoxLadder = {
    x: number;
    y: number;
    z: number;
};
export declare class LayoutBox {
    #private;
    constructor(element: ElementOrSelector<HTMLElement>, options?: LayoutBoxOptions);
    get element(): HTMLElement;
    get containerElement(): HTMLElement;
    get position(): LayoutBoxLadder;
    get rotation(): LayoutBoxLadder;
    get scale(): LayoutBoxLadder;
    get scrollValue(): LayoutBoxXYZ;
    get left(): number;
    get top(): number;
    get CSSTranslation(): LayoutBoxXYZ;
    get CSSRotation(): LayoutBoxXYZ;
    get CSSScale(): LayoutBoxXYZ;
    get front(): number;
    get width(): number;
    get height(): number;
    get depth(): number;
    destroy(): void;
    bindObject(object: LayoutBoxBindedObject): void;
    unbindObject(object: LayoutBoxBindedObject): void;
    setScrollStep(callback: LayoutBoxScrollStepCallback): () => void;
    deleteScrollStep(callback: LayoutBoxScrollStepCallback): void;
    setPositionStep(...args: Parameters<Ladder<LayoutBoxLadder>['setStep']>): void;
    getPositionStep(...args: Parameters<Ladder<LayoutBoxLadder>['getStepValue']>): LayoutBoxLadder;
    setRotationStep(...args: Parameters<Ladder<LayoutBoxLadder>['setStep']>): void;
    getRotationStep(...args: Parameters<Ladder<LayoutBoxLadder>['getStepValue']>): LayoutBoxLadder;
    getExcludedRotationSteps(...args: Parameters<Ladder<LayoutBoxLadder>['getExcludedStepsValue']>): LayoutBoxLadder;
    getIncludedRotationSteps(...args: Parameters<Ladder<LayoutBoxLadder>['getIncludedStepsValue']>): LayoutBoxLadder;
    setScaleStep(...args: Parameters<Ladder<LayoutBoxLadder>['setStep']>): void;
    getScaleStep(...args: Parameters<Ladder<LayoutBoxLadder>['getStepValue']>): LayoutBoxLadder;
    getExcludedScaleSteps(...args: Parameters<Ladder<LayoutBoxLadder>['getExcludedStepsValue']>): LayoutBoxLadder;
    getIncludedScaleSteps(...args: Parameters<Ladder<LayoutBoxLadder>['getIncludedStepsValue']>): LayoutBoxLadder;
    deletePositionStep(...args: Parameters<Ladder<LayoutBoxLadder>['deleteStep']>): void;
    getExcludedPositionSteps(...args: Parameters<Ladder<LayoutBoxLadder>['getExcludedStepsValue']>): LayoutBoxLadder;
    getIncludedPositionSteps(...args: Parameters<Ladder<LayoutBoxLadder>['getIncludedStepsValue']>): LayoutBoxLadder;
    deleteRotationStep(...args: Parameters<Ladder<LayoutBoxLadder>['deleteStep']>): void;
    deleteScaleStep(...args: Parameters<Ladder<LayoutBoxLadder>['deleteStep']>): void;
    onPosition(...args: Parameters<Ladder<LayoutBoxLadder>['subscribe']>): () => void;
    offPosition(...args: Parameters<Ladder<LayoutBoxLadder>['unsubscribe']>): void;
    onScale(...args: Parameters<Ladder<LayoutBoxLadder>['subscribe']>): () => void;
    offScale(...args: Parameters<Ladder<LayoutBoxLadder>['unsubscribe']>): void;
    onRotation(...args: Parameters<Ladder<LayoutBoxLadder>['subscribe']>): () => void;
    offRotation(...args: Parameters<Ladder<LayoutBoxLadder>['unsubscribe']>): void;
    onResize(...args: Parameters<Notifier['subscribe']>): () => void;
    offResize(...args: Parameters<Notifier['unsubscribe']>): void;
}
