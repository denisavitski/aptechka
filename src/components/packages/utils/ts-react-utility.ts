import { CSSProperty } from '@packages/css-property'
import { CamelToKebab } from './ts-utility'

export type GetCustomElementCSSProperties<T extends HTMLElement> = {
  [K in keyof T as T[K] extends CSSProperty<any>
    ? K extends `${infer Base}CSSProperty`
      ? `--${CamelToKebab<Base>}`
      : never
    : never]: T[K] extends { current: any } ? T[K]['current'] | string : never
}

export type ReactCustomElement<
  El extends HTMLElement,
  Attributes extends object = object
> = React.DetailedHTMLProps<React.HTMLAttributes<El>, El> & {
  class?: string | undefined
} & {
  style?: React.CSSProperties & Partial<GetCustomElementCSSProperties<El>>
} & Attributes
