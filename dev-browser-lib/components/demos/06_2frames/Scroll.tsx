import '@packages/scroll'
import { createContext, onConnect, onContext } from '@packages/jsx/hooks'
import { ScrollElement } from '@packages/scroll'
import { Axes2D } from '@packages/utils'
import { Store } from '@packages/store'

export interface ScrollOptions {
  axis?: Axes2D | Store<Axes2D>
  pages?: number | Store<number>
  split?: boolean | Store<boolean>
  sectional?: boolean | Store<boolean>
  wheelMaxDelta?: boolean | Store<boolean>
  infinite?: boolean | Store<boolean>
  damping?: number | Store<number>
  disabled?: boolean | Store<boolean>
  hibernated?: boolean | Store<boolean>
}

export function onScroll(
  callback: (context: ScrollElement['context']) => void
) {
  onContext<ScrollElement>('scroll', (scrollElement) => {
    return scrollElement.onScroll(() => {
      callback(scrollElement.context)
    })
  })
}

export const Scroll: JSX.Component<ScrollOptions> = (props) => {
  const ref = { current: null! as ScrollElement }

  onConnect(() => {
    createContext('scroll', ref.current)
  })

  return (
    <component>
      <e-scroll
        {...(props as any)}
        ref={ref}
        lightChildren
      >
        {props.children}
      </e-scroll>
    </component>
  )
}
