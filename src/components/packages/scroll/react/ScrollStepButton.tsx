'use client'

import {
  ScrollBehaviour,
  ScrollStepButtonElement,
} from '@packages/scroll/vanilla'
import { ReactCustomElement } from '@packages/utils'

export type ReactScrollStepButtonElement = ReactCustomElement<
  ScrollStepButtonElement,
  {
    step?: number | string
    behaviour?: ScrollBehaviour
  }
>

export const ScrollStepButton: React.FC<ReactScrollStepButtonElement> = (
  props
) => {
  return (
    <e-scroll-step-button
      {...props}
      class={props.className}
      className={undefined}
    ></e-scroll-step-button>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'e-scroll-step-button': ReactScrollStepButtonElement
    }
  }
}
