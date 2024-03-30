import { ElementConstructor } from '@packages/element-constructor'
import { customConstructors, register, render } from '..'
import { App } from './App'
import { CustomConstructorParameters } from '../CustomConstructor'

customConstructors.set(
  'x',
  class {
    constructor(parameters: CustomConstructorParameters) {
      console.log(parameters)
    }
  }
)

render(App)
