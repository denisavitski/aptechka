import React from 'react'
import css from './index.module.css'
import { Outliner } from '../Outliner'
import { Tweaker } from '../Tweaker'

export const Studio: React.FC = () => {
  return (
    <div className={css.studio}>
      <Outliner></Outliner>
      <Tweaker></Tweaker>
    </div>
  )
}
