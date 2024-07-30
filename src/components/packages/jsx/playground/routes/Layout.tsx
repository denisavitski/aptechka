import { attachShadow } from '@packages/jsx/hooks/basic/attachShadow'
import { attachStylesheet } from '@packages/jsx/hooks/basic/attachStylesheet'

const Layout: JSX.Component = () => {
  attachShadow()

  attachStylesheet({
    nav: {
      position: 'fixed',
      top: '0',
      left: '50%',
      display: 'flex',
      gap: '1vmin',
      fontSize: '2vmin',
    },
  })

  return (
    <component>
      <nav>
        <a
          data-nav
          href="/"
        >
          HOME
        </a>
        <a
          data-nav
          href="/about?x=100"
        >
          ABOUT
        </a>
        <a
          data-nav
          href="/admin"
        >
          ADMIN
        </a>
      </nav>

      <div data-nest></div>
    </component>
  )
}

export default Layout
