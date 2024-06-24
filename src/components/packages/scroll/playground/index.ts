import { devMode } from '@packages/dev'
import '@packages/scroll'
import { ScrollSegmentElement } from '@packages/scroll'
import { preciseNumber } from '@packages/utils'

devMode()

const segment = document.querySelector('#se') as ScrollSegmentElement
