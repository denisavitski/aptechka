import { onConnect, onDisconnect } from '@packages/jsx/hooks'

export interface CardParameters {
  id: number
}

export const Card: JSX.Component<CardParameters> = (props) => {
  console.log('Constructor', props.id)

  onConnect(() => {
    console.log('Card', props.id, 'onConnect')
  })

  onDisconnect(() => {
    console.log('Card', props.id, 'onDisconnect')
  })

  return <component style={{ color: 'red' }}>{props.id}</component>
}
