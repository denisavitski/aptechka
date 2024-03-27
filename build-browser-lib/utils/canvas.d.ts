export declare function measureText(context: CanvasRenderingContext2D, text: string): {
    height: number;
    width: number;
};
export declare function fixPosition(position: number): number;
export declare function cover(contentWidth: number, contentHeight: number, containerWidth: number, containerHeight: number, offsetLeft?: number, offsetTop?: number): readonly [number, number, number, number];
