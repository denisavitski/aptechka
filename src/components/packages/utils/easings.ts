export type EasingFunction = (t: number) => number

export const linear: EasingFunction = (t: number) => {
  return t
}

export const easeInQuad: EasingFunction = (t: number) => {
  return t * t
}

export const easeOutQuad: EasingFunction = (t: number) => {
  return t * (2 - t)
}

export const easeInOutQuad: EasingFunction = (t: number) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export const easeInCubic: EasingFunction = (t: number) => {
  return t * t * t
}

export const easeOutCubic: EasingFunction = (t: number) => {
  return --t * t * t + 1
}

export const easeInOutCubic: EasingFunction = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

export const easeInQuart: EasingFunction = (t: number) => {
  return t * t * t * t
}

export const easeOutQuart: EasingFunction = (t: number) => {
  return 1 - --t * t * t * t
}

export const easeInOutQuart: EasingFunction = (t: number) => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
}

export const easeInQuint: EasingFunction = (t: number) => {
  return t * t * t * t * t
}

export const easeOutQuint: EasingFunction = (t: number) => {
  return 1 + --t * t * t * t * t
}

export const easeInOutQuint: EasingFunction = (t: number) => {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}

export const easeInExpo: EasingFunction = (t: number) => {
  return t === 0 ? 0 : 2 ** (10 * (t - 1))
}

export const easeOutExpo: EasingFunction = (t: number) => {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t)
}

export const easeInOutExpo: EasingFunction = (t: number) => {
  return t === 0 || t === 1
    ? t
    : t < 0.5
      ? 0.5 * 2 ** (10 * 2 * (t - 0.5))
      : 0.5 * (2 - Math.abs(2 ** (-10 * 2 * (t - 0.5))))
}

export const easeOvershoot: EasingFunction = (t: number) => {
  return (
    3 * (1 - t) * (1 - t) * t * 0.33 +
    3 * (1 - t) * t * t * 1.42 +
    t * t * t * 0.05
  )
}

export const easings = {
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
  easeOvershoot,
} as const
