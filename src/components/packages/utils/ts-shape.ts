export type Axes2D = 'x' | 'y'

export type Axes3D = Axes2D | 'z'

export type Dot2D = {
  x: number
  y: number
}

export type Rect2D = Dot2D & {
  width: number
  height: number
}

export type Circle = Dot2D & {
  radius: number
}

export type Dot3D = Dot2D & {
  z: number
}

export type Rect3D = Rect2D & {
  depth: number
}
