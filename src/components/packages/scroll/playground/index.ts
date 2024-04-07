import { devMode } from '@packages/dev'
import '@packages/scroll'
import { ScrollSegmentElement } from '@packages/scroll'

devMode()

const segment = document.querySelector('#se') as ScrollSegmentElement
