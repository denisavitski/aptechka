import { Dimension2D, Dot2D, Rect2D } from './ts-shape.js';

export declare function screenToCartesian(screenCoordinate: Dot2D, container: Pick<Rect2D, 'width' | 'height'>, normalize?: boolean): {
    x: number;
    y: number;
};
export declare function normalize(coordinate: Dot2D, size: Dimension2D): {
    x: number;
    y: number;
};
export declare function getPointerPosition(event: MouseEvent | PointerEvent | Dot2D, rect?: Rect2D): {
    x: number;
    y: number;
};
