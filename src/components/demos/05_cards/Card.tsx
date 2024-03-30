import { onConnect, onDisconnect } from '@packages/jsx/hooks'

export interface CardParameters {
  id: number
}

export const Card: JSX.Component<CardParameters> = (props) => {
  onConnect(() => {
    console.log('Card', props.id, 'onConnect')
  })

  onDisconnect(() => {
    console.log('Card', props.id, 'onDisconnect')
  })

  return <component data-card-id={props.id}></component>
}
