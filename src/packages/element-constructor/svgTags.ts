import { ElementConstructorTagObject, ElementConstructor } from './ElementConstructor'

export function svgA(object?: Omit<ElementConstructorTagObject<'a'>, 'svg'>) {
  return new ElementConstructor({
    a: {
      ...object,
      svg: true,
    },
  })
}

export function animate(object?: Omit<ElementConstructorTagObject<'animate'>, 'svg'>) {
  return new ElementConstructor({
    animate: {
      ...object,
      svg: true,
    },
  })
}

export function animateMotion(object?: Omit<ElementConstructorTagObject<'animateMotion'>, 'svg'>) {
  return new ElementConstructor({
    animateMotion: {
      ...object,
      svg: true,
    },
  })
}

export function animateTransform(
  object?: Omit<ElementConstructorTagObject<'animateTransform'>, 'svg'>
) {
  return new ElementConstructor({
    animateTransform: {
      ...object,
      svg: true,
    },
  })
}

export function circle(object?: Omit<ElementConstructorTagObject<'circle'>, 'svg'>) {
  return new ElementConstructor({
    circle: {
      ...object,
      svg: true,
    },
  })
}

export function clipPath(object?: Omit<ElementConstructorTagObject<'clipPath'>, 'svg'>) {
  return new ElementConstructor({
    clipPath: {
      ...object,
      svg: true,
    },
  })
}

export function defs(object?: Omit<ElementConstructorTagObject<'defs'>, 'svg'>) {
  return new ElementConstructor({
    defs: {
      ...object,
      svg: true,
    },
  })
}

export function desc(object?: Omit<ElementConstructorTagObject<'desc'>, 'svg'>) {
  return new ElementConstructor({
    desc: {
      ...object,
      svg: true,
    },
  })
}

export function ellipse(object?: Omit<ElementConstructorTagObject<'ellipse'>, 'svg'>) {
  return new ElementConstructor({
    ellipse: {
      ...object,
      svg: true,
    },
  })
}

export function feBlend(object?: Omit<ElementConstructorTagObject<'feBlend'>, 'svg'>) {
  return new ElementConstructor({
    feBlend: {
      ...object,
      svg: true,
    },
  })
}

export function feColorMatrix(object?: Omit<ElementConstructorTagObject<'feColorMatrix'>, 'svg'>) {
  return new ElementConstructor({
    feColorMatrix: {
      ...object,
      svg: true,
    },
  })
}

export function feComponentTransfer(
  object?: Omit<ElementConstructorTagObject<'feComponentTransfer'>, 'svg'>
) {
  return new ElementConstructor({
    feComponentTransfer: {
      ...object,
      svg: true,
    },
  })
}

export function feComposite(object?: Omit<ElementConstructorTagObject<'feComposite'>, 'svg'>) {
  return new ElementConstructor({
    feComposite: {
      ...object,
      svg: true,
    },
  })
}

export function feConvolveMatrix(
  object?: Omit<ElementConstructorTagObject<'feConvolveMatrix'>, 'svg'>
) {
  return new ElementConstructor({
    feConvolveMatrix: {
      ...object,
      svg: true,
    },
  })
}

export function feDiffuseLighting(
  object?: Omit<ElementConstructorTagObject<'feDiffuseLighting'>, 'svg'>
) {
  return new ElementConstructor({
    feDiffuseLighting: {
      ...object,
      svg: true,
    },
  })
}

export function feDisplacementMap(
  object?: Omit<ElementConstructorTagObject<'feDisplacementMap'>, 'svg'>
) {
  return new ElementConstructor({
    feDisplacementMap: {
      ...object,
      svg: true,
    },
  })
}

export function feDistantLight(
  object?: Omit<ElementConstructorTagObject<'feDistantLight'>, 'svg'>
) {
  return new ElementConstructor({
    feDistantLight: {
      ...object,
      svg: true,
    },
  })
}

export function feDropShadow(object?: Omit<ElementConstructorTagObject<'feDropShadow'>, 'svg'>) {
  return new ElementConstructor({
    feDropShadow: {
      ...object,
      svg: true,
    },
  })
}

export function feFlood(object?: Omit<ElementConstructorTagObject<'feFlood'>, 'svg'>) {
  return new ElementConstructor({
    feFlood: {
      ...object,
      svg: true,
    },
  })
}

export function feFuncA(object?: Omit<ElementConstructorTagObject<'feFuncA'>, 'svg'>) {
  return new ElementConstructor({
    feFuncA: {
      ...object,
      svg: true,
    },
  })
}

export function feFuncB(object?: Omit<ElementConstructorTagObject<'feFuncB'>, 'svg'>) {
  return new ElementConstructor({
    feFuncB: {
      ...object,
      svg: true,
    },
  })
}

export function feFuncG(object?: Omit<ElementConstructorTagObject<'feFuncG'>, 'svg'>) {
  return new ElementConstructor({
    feFuncG: {
      ...object,
      svg: true,
    },
  })
}

export function feFuncR(object?: Omit<ElementConstructorTagObject<'feFuncR'>, 'svg'>) {
  return new ElementConstructor({
    feFuncR: {
      ...object,
      svg: true,
    },
  })
}

export function feGaussianBlur(
  object?: Omit<ElementConstructorTagObject<'feGaussianBlur'>, 'svg'>
) {
  return new ElementConstructor({
    feGaussianBlur: {
      ...object,
      svg: true,
    },
  })
}

export function feImage(object?: Omit<ElementConstructorTagObject<'feImage'>, 'svg'>) {
  return new ElementConstructor({
    feImage: {
      ...object,
      svg: true,
    },
  })
}

export function feMerge(object?: Omit<ElementConstructorTagObject<'feMerge'>, 'svg'>) {
  return new ElementConstructor({
    feMerge: {
      ...object,
      svg: true,
    },
  })
}

export function feMergeNode(object?: Omit<ElementConstructorTagObject<'feMergeNode'>, 'svg'>) {
  return new ElementConstructor({
    feMergeNode: {
      ...object,
      svg: true,
    },
  })
}

export function feMorphology(object?: Omit<ElementConstructorTagObject<'feMorphology'>, 'svg'>) {
  return new ElementConstructor({
    feMorphology: {
      ...object,
      svg: true,
    },
  })
}

export function feOffset(object?: Omit<ElementConstructorTagObject<'feOffset'>, 'svg'>) {
  return new ElementConstructor({
    feOffset: {
      ...object,
      svg: true,
    },
  })
}

export function fePointLight(object?: Omit<ElementConstructorTagObject<'fePointLight'>, 'svg'>) {
  return new ElementConstructor({
    fePointLight: {
      ...object,
      svg: true,
    },
  })
}

export function feSpecularLighting(
  object?: Omit<ElementConstructorTagObject<'feSpecularLighting'>, 'svg'>
) {
  return new ElementConstructor({
    feSpecularLighting: {
      ...object,
      svg: true,
    },
  })
}

export function feSpotLight(object?: Omit<ElementConstructorTagObject<'feSpotLight'>, 'svg'>) {
  return new ElementConstructor({
    feSpotLight: {
      ...object,
      svg: true,
    },
  })
}

export function feTile(object?: Omit<ElementConstructorTagObject<'feTile'>, 'svg'>) {
  return new ElementConstructor({
    feTile: {
      ...object,
      svg: true,
    },
  })
}

export function feTurbulence(object?: Omit<ElementConstructorTagObject<'feTurbulence'>, 'svg'>) {
  return new ElementConstructor({
    feTurbulence: {
      ...object,
      svg: true,
    },
  })
}

export function filter(object?: Omit<ElementConstructorTagObject<'filter'>, 'svg'>) {
  return new ElementConstructor({
    filter: {
      ...object,
      svg: true,
    },
  })
}

export function foreignObject(object?: Omit<ElementConstructorTagObject<'foreignObject'>, 'svg'>) {
  return new ElementConstructor({
    foreignObject: {
      ...object,
      svg: true,
    },
  })
}

export function g(object?: Omit<ElementConstructorTagObject<'g'>, 'svg'>) {
  return new ElementConstructor({
    g: {
      ...object,
      svg: true,
    },
  })
}

export function image(object?: Omit<ElementConstructorTagObject<'image'>, 'svg'>) {
  return new ElementConstructor({
    image: {
      ...object,
      svg: true,
    },
  })
}

export function line(object?: Omit<ElementConstructorTagObject<'line'>, 'svg'>) {
  return new ElementConstructor({
    line: {
      ...object,
      svg: true,
    },
  })
}

export function linearGradient(
  object?: Omit<ElementConstructorTagObject<'linearGradient'>, 'svg'>
) {
  return new ElementConstructor({
    linearGradient: {
      ...object,
      svg: true,
    },
  })
}

export function marker(object?: Omit<ElementConstructorTagObject<'marker'>, 'svg'>) {
  return new ElementConstructor({
    marker: {
      ...object,
      svg: true,
    },
  })
}

export function mask(object?: Omit<ElementConstructorTagObject<'mask'>, 'svg'>) {
  return new ElementConstructor({
    mask: {
      ...object,
      svg: true,
    },
  })
}

export function metadata(object?: Omit<ElementConstructorTagObject<'metadata'>, 'svg'>) {
  return new ElementConstructor({
    metadata: {
      ...object,
      svg: true,
    },
  })
}

export function mpath(object?: Omit<ElementConstructorTagObject<'mpath'>, 'svg'>) {
  return new ElementConstructor({
    mpath: {
      ...object,
      svg: true,
    },
  })
}

export function path(object?: Omit<ElementConstructorTagObject<'path'>, 'svg'>) {
  return new ElementConstructor({
    path: {
      ...object,
      svg: true,
    },
  })
}

export function pattern(object?: Omit<ElementConstructorTagObject<'pattern'>, 'svg'>) {
  return new ElementConstructor({
    pattern: {
      ...object,
      svg: true,
    },
  })
}

export function polygon(object?: Omit<ElementConstructorTagObject<'polygon'>, 'svg'>) {
  return new ElementConstructor({
    polygon: {
      ...object,
      svg: true,
    },
  })
}

export function polyline(object?: Omit<ElementConstructorTagObject<'polyline'>, 'svg'>) {
  return new ElementConstructor({
    polyline: {
      ...object,
      svg: true,
    },
  })
}

export function radialGradient(
  object?: Omit<ElementConstructorTagObject<'radialGradient'>, 'svg'>
) {
  return new ElementConstructor({
    radialGradient: {
      ...object,
      svg: true,
    },
  })
}

export function rect(object?: Omit<ElementConstructorTagObject<'rect'>, 'svg'>) {
  return new ElementConstructor({
    rect: {
      ...object,
      svg: true,
    },
  })
}

export function svgScript(object?: Omit<ElementConstructorTagObject<'script'>, 'svg'>) {
  return new ElementConstructor({
    script: {
      ...object,
      svg: true,
    },
  })
}

export function set(object?: Omit<ElementConstructorTagObject<'set'>, 'svg'>) {
  return new ElementConstructor({
    set: {
      ...object,
      svg: true,
    },
  })
}

export function stop(object?: Omit<ElementConstructorTagObject<'stop'>, 'svg'>) {
  return new ElementConstructor({
    stop: {
      ...object,
      svg: true,
    },
  })
}

export function svgStyle(object?: Omit<ElementConstructorTagObject<'style'>, 'svg'>) {
  return new ElementConstructor({
    style: {
      ...object,
      svg: true,
    },
  })
}

export function svg(object?: Omit<ElementConstructorTagObject<'svg'>, 'svg'>) {
  return new ElementConstructor({
    svg: {
      ...object,
      svg: true,
    },
  })
}

export function svgSwitch(object?: Omit<ElementConstructorTagObject<'switch'>, 'svg'>) {
  return new ElementConstructor({
    switch: {
      ...object,
      svg: true,
    },
  })
}

export function symbol(object?: Omit<ElementConstructorTagObject<'symbol'>, 'svg'>) {
  return new ElementConstructor({
    symbol: {
      ...object,
      svg: true,
    },
  })
}

export function text(object?: Omit<ElementConstructorTagObject<'text'>, 'svg'>) {
  return new ElementConstructor({
    text: {
      ...object,
      svg: true,
    },
  })
}

export function textPath(object?: Omit<ElementConstructorTagObject<'textPath'>, 'svg'>) {
  return new ElementConstructor({
    textPath: {
      ...object,
      svg: true,
    },
  })
}

export function svgTitle(object?: Omit<ElementConstructorTagObject<'title'>, 'svg'>) {
  return new ElementConstructor({
    title: {
      ...object,
      svg: true,
    },
  })
}

export function tspan(object?: Omit<ElementConstructorTagObject<'tspan'>, 'svg'>) {
  return new ElementConstructor({
    tspan: {
      ...object,
      svg: true,
    },
  })
}

export function use(object?: Omit<ElementConstructorTagObject<'use'>, 'svg'>) {
  return new ElementConstructor({
    use: {
      ...object,
      svg: true,
    },
  })
}

export function view(object?: Omit<ElementConstructorTagObject<'view'>, 'svg'>) {
  return new ElementConstructor({
    view: {
      ...object,
      svg: true,
    },
  })
}
