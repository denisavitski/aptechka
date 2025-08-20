import { useShadow } from '@packages/jsx/hooks/component/useShadow'
import { useStylesheet } from '@packages/jsx/hooks/component/useStylesheet'
import { render } from '@packages/jsx/render'

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
          <a href="/">HOMEEEEEEE</a>
          <a href="/about">ABOUT</a>
          <a href="/about/company">ABOUT COMPANY</a>
        </nav>
      </shadow>
    </component>
  )
}

if (import.meta.hot) {
  import.meta.hot.accept((Module) => {
    for (const key in Module) {
      if (Object.prototype.hasOwnProperty.call(Module, key)) {
        if (typeof Module[key] === 'function') {
          const container = document.createElement('div')
          render(container, Module[key])
          const el = container.firstElementChild

          if (el) {
            const founded = document.querySelector(
              `[data-hmr-id="${el.getAttribute('data-hmr-id')}"]`,
            )

            console.log(el, el.getAttribute('data-hmr-id'))

            if (founded) {
              founded.replaceWith(el)
            }
          }
        }
      }
    }
  })
}
