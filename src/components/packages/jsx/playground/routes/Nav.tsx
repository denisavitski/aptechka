import { useShadow } from '@packages/jsx/hooks/component/useShadow'
import { useStylesheet } from '@packages/jsx/hooks/component/useStylesheet'

export const Nav = () => {
  useShadow()
  useStylesheet({
    nav: {
      display: 'flex',
      gap: '10px',
      position: 'fixed',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  })

  return (
    <component>
      <shadow>
        <nav>
          <a href="/">HOME</a>
          <a href="/about">ABOUT</a>
          <a href="/about/company">ABOUT COMPANY</a>
        </nav>
      </shadow>
    </component>
  )
}
