export function hmrPlugin() {
  return {
    name: 'jsx-hmr-plugin',
    transform(code: string, id: string) {
      if (id.endsWith('.jsx') || id.endsWith('.tsx')) {
        let transformed = code

        transformed += `\n
          if (import.meta.hot) {
            import.meta.hot.accept(async (Module) => {
              const { render } = await import('@packages/jsx/render')
              const { camelToKebab } = await import('@packages/utils')
              for (const key in Module) {
                if (Object.prototype.hasOwnProperty.call(Module, key)) {
                  if (typeof Module[key] === 'function') {
                    const tag = \`e-\${camelToKebab(Module[key].name)}\`
                    const foundedElements = [...document.querySelectorAll(tag)]

                    foundedElements.forEach((el) => {
                      const nestElements = el.querySelectorAll('[data-nest]')

                      const container = document.createElement('div')
                      render(container, Module[key], el.__props__)
                      const componentElement = container.firstElementChild

                      if (componentElement) {
                        el.replaceWith(componentElement)

                        componentElement
                          .querySelectorAll('[data-nest]')
                          .forEach((el, i) => {
                            if (nestElements[i]) {
                              el.replaceWith(nestElements[i])
                            }
                          })
                      }
                    })
                  }
                }
              }
            })
          }
        `

        return {
          code: transformed,
          map: null,
        }
      }

      return null
    },
  }
}
