'use client'

import { ScrollbarElement } from '@packages/scroll/vanilla'
import { ReactCustomElement } from '@packages/utils'

export type ReactScrollbar = ReactCustomElement<ScrollbarElement>

export const Scrollbar: React.FC<ReactScrollbar> = (props) => {
  return (
    <e-scrollbar
      {...props}
      class={props.className}
      className={undefined}
      slot="static"
    ></e-scrollbar>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'e-scrollbar': ReactScrollbar
    }
  }
}
