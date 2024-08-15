import React from 'react'
import css from './index.module.css'
import { useStore } from '@packages/store/react'
import { activeStore } from '../store'

export interface TweakerProps {}

export const Tweaker: React.FC<TweakerProps> = ({}) => {
  const [store] = useStore(activeStore)

  console.log(store)

  return <div className={css.tweaker}></div>
}
