import React from 'react'
import { Scroll, useScroll } from '../Scroll'
import { Scrollbar } from '../Scrollbar'
import { ScrollBulletButtons } from '../ScrollBulletButtons'
import { ScrollSetButton } from '../ScrollSetButton'
import { ScrollStepButton } from '../ScrollStepButton'
import { ScrollSegment } from '../ScrollSegment'
import { useTicker } from '@packages/ticker/react'

export const Component: React.FC = () => {
  const scroll = useScroll()

  useTicker(() => {
    console.log(scroll.current?.currentScrollValue)
  })

  return <div>Comp</div>
}

export const App: React.FC = () => {
  return (
    <>
      <Scroll
        className="scroll"
        style={{ '--damping': 22 }}
      >
        <Scrollbar></Scrollbar>
        <div
          className="buttons"
          slot="static"
        >
          <ScrollBulletButtons></ScrollBulletButtons>
          <ScrollSetButton index={1}></ScrollSetButton>
          <ScrollStepButton
            step={1}
            behaviour={'instant'}
          ></ScrollStepButton>
        </div>

        <div className="section">
          <ScrollSegment
            style={{
              '--progress-var': 'xxx',
            }}
            onCapture={() => {
              console.log('onCapture')
            }}
            onCaptureFromFinish={() => {
              console.log('onCaptureFromFinish')
            }}
            onCaptureFromStart={() => {
              console.log('onCaptureFromStart')
            }}
            onRelease={() => {
              console.log('onRelease')
            }}
            onReleaseFromStart={() => {
              console.log('onReleaseFromStart')
            }}
            onReleaseFromFinish={() => {
              console.log('onReleaseFromFinish')
            }}
          ></ScrollSegment>
        </div>
        <div className="section">
          <Component></Component>
        </div>
        <div className="section"></div>
        <div className="section"></div>
      </Scroll>
    </>
  )
}
