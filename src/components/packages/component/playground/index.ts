import { CanvasElement } from '@packages/canvas'
import { Component, onConnect } from '..'

Component(CanvasElement, 'asd', (e) => {
  onConnect((e) => {
    console.log(e)
  })

  return {
    class: 'asd',
  }
})
