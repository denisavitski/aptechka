import { attachShadow } from '@packages/jsx/hooks/attachShadow'
import { attachStylesheet } from '@packages/jsx/hooks/attachStylesheet'

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
          href="/about"
        >
          ABOUT
        </a>
        <a
          data-nav
          href="/about/news"
        >
          NEWS
        </a>
      </nav>

      <div data-nest></div>
    </component>
  )
}

export default Layout
