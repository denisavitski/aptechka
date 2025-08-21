import { useShadow } from '@packages/jsx/hooks/component/useShadow'
import { useStylesheet } from '@packages/jsx/hooks/component/useStylesheet'

export const Nav: JSX.Component<{ index: number }> = (props) => {
  useShadow()
  useStylesheet({
    nav: {
      display: 'flex',
      gap: '10px',
      position: 'fixed',
      top: `calc(10px + 50px * ${props.index + 1})`,
      left: '50%',
      transform: 'translateX(-50%)',
    },
  })

  return (
    <component>
      <shadow>
        <nav>
          <a href="/">HOMEEEEE</a>
          <a href="/about">ABOUT</a>
          <a href="/about/company">ABOUT COMPANY</a>
        </nav>
      </shadow>
    </component>
  )
}
