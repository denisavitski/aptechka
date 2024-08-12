'use client'

import { ScrollBulletButtonsElement } from '@packages/scroll/vanilla'
import { ReactCustomElement } from '@packages/utils'

export type ReactScrollBulletButtons =
  ReactCustomElement<ScrollBulletButtonsElement>

export const ScrollBulletButtons: React.FC<ReactScrollBulletButtons> = (
  props
) => {
  return (
    <e-scroll-bullet-buttons
      {...props}
      class={props.className}
      className={undefined}
    ></e-scroll-bullet-buttons>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'e-scroll-bullet-buttons': ReactScrollBulletButtons
    }
  }
}
