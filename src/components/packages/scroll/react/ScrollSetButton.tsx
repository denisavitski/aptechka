'use client'

import {
  ScrollBehaviour,
  ScrollSetButtonElement,
} from '@packages/scroll/vanilla'

import { ReactCustomElement } from '@packages/utils'

export type ReactScrollSetButtonElement = ReactCustomElement<
  ScrollSetButtonElement,
  {
    index?: number | string
    behaviour?: ScrollBehaviour
  }
>

export const ScrollSetButton: React.FC<ReactScrollSetButtonElement> = (
  props
) => {
  return (
    <e-scroll-set-button
      {...props}
      class={props.className}
      className={undefined}
    ></e-scroll-set-button>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'e-scroll-set-button': ReactScrollSetButtonElement
    }
  }
}
