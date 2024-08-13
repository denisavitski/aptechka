'use client'

import '@packages/scroll/vanilla'
import { ScrollElement } from '@packages/scroll/vanilla'
import { ReactCustomElement } from '@packages/utils'
import { createContext, forwardRef, RefObject, useContext, useRef } from 'react'

export type ReactScroll = ReactCustomElement<ScrollElement>

const context = createContext<RefObject<ScrollElement>>(null!)

export function useScroll() {
  return useContext(context)
}

export const Scroll = forwardRef<ScrollElement, ReactScroll>(
  ({ className, children, ...props }, ref) => {
    const scrollRef = useRef<ScrollElement>(null!)

    return (
      <e-scroll
        {...props}
        class={className}
        ref={(e) => {
          scrollRef.current = e!

          if (typeof ref === 'function') {
            ref(e)
          } else if (ref) {
            ref.current = e
          }
        }}
      >
        <context.Provider value={scrollRef}>{children}</context.Provider>
      </e-scroll>
    )
  }
)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'e-scroll': ReactScroll
    }
  }
}
