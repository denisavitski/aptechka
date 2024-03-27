import { attachStylesheet } from '@packages/jsx/hooks'

import { cssVars } from './cssVars'
import { Scroll } from './Scroll'

export const Mascot: JSX.Component = () => {
  attachStylesheet({
    '.mascot': {
      position: 'fixed',
      left: '50%',
      top: '7rem',
      width: '28rem',
      height: '54rem',
      objectFit: 'contain',
      transform: 'translateX(-50%)',
    },
  })

  const mascot = { current: null! as HTMLElement }

  return (
    <img
      ref={mascot}
      class="mascot"
      src="/2frames/images/cocoon.png"
    />
  )
}

export const Intro: JSX.Component = () => {
  attachStylesheet({
    '.intro': {
      width: '100vw',
      height: '100vh',

      paddingTop: '50rem',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',

      backgroundColor: cssVars['--color-violet'],
    },

    '.intro__logo': {
      width: '100rem',
      height: '20rem',
      objectFit: 'cover',
    },

    '.intro__heading': {
      fontFamily: 'Editoral',
      fontSize: '3.4rem',
      textAlign: 'center',

      width: '50.4rem',

      color: cssVars['--color-white'],
    },
  })

  return (
    <component class="intro">
      <h1 class="intro__heading">
        Catering Creativity, Framing Dreams: Where Ideas Spread Their Wings
      </h1>
    </component>
  )
}

export const Overview: JSX.Component = () => {
  attachStylesheet({
    '.overview': {
      width: '100vw',
      height: '100vh',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',

      backgroundColor: cssVars['--color-violet'],
    },

    '.play': {
      width: '20rem',
      height: '20rem',
      backgroundColor: 'white',
      borderRadius: '50%',
    },
  })

  return (
    <component class="overview">
      <button class="play"></button>
    </component>
  )
}

export const App: JSX.Component = () => {
  return (
    <component>
      <Scroll damping={0.01}>
        <Overview></Overview>
        <Overview></Overview>
      </Scroll>
    </component>
  )
}
