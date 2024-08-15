'use client'

import { ScrollSegmentElement } from '@packages/scroll/vanilla'
import { Store } from '@packages/store/vanilla'
import { ReactCustomElement } from '@packages/utils'
import { forwardRef, useEffect, useRef } from 'react'

export type ReactScrollSegment = ReactCustomElement<
  ScrollSegmentElement,
  {
    onCapture?: () => void
    onCaptureFromStart?: () => void
    onCaptureFromFinish?: () => void
    onRelease?: () => void
    onReleaseFromStart?: () => void
    onReleaseFromFinish?: () => void
  }
>

export const ScrollSegment = forwardRef<
  ScrollSegmentElement,
  ReactScrollSegment
>(
  (
    {
      className,
      onCapture,
      onCaptureFromStart,
      onCaptureFromFinish,
      onRelease,
      onReleaseFromStart,
      onReleaseFromFinish,
      ...props
    },
    ref
  ) => {
    const segmentRef = useRef<ScrollSegmentElement>(null!)

    useEffect(() => {
      const listen = (store: Store<boolean>, callback?: () => void) => {
        if (callback) {
          return store.subscribe((e) => {
            if (e.current) {
              callback()
            }
          })
        }
      }

      const unsubscribe = [
        listen(segmentRef.current!.isCaptured, onCapture),
        listen(segmentRef.current!.isCapturedFromStart, onCaptureFromStart),
        listen(segmentRef.current!.isCapturedFromFinish, onCaptureFromFinish),
        listen(segmentRef.current!.isReleased, onRelease),
        listen(segmentRef.current!.isReleasedFromStart, onReleaseFromStart),
        listen(segmentRef.current!.isReleasedFromFinish, onReleaseFromFinish),
      ]

      return () => {
        unsubscribe.forEach((u) => u?.())
      }
    }, [
      onCapture,
      onCaptureFromStart,
      onCaptureFromFinish,
      onRelease,
      onReleaseFromStart,
      onReleaseFromFinish,
    ])

    return (
      <e-scroll-segment
        {...props}
        class={className}
        ref={(e) => {
          segmentRef.current = e!

          if (typeof ref === 'function') {
            ref(e)
          } else if (ref) {
            ref.current = e
          }
        }}
      ></e-scroll-segment>
    )
  }
)

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'e-scroll-segment': ReactScrollSegment
    }
  }
}
