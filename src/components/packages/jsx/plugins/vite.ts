export interface hmrPluginOptions {
  __dev?: boolean
}

export function aptechkaVite(options?: hmrPluginOptions) {
  const moduleBase = options?.__dev ? '@packages' : 'aptechka'

  return {
    name: 'jsx-hmr-plugin',
    apply: 'serve' as const,
    transform(code: string, id: string) {
      if (
        (id.endsWith('.jsx') || id.endsWith('.tsx')) &&
        !id.endsWith('render.tsx')
      ) {
        let transformed = code

        transformed += `\n
          if (import.meta.hot) {
            import.meta.hot.accept(async (Module) => {
              const { render } = await import('${moduleBase}/jsx')
              const { camelToKebab } = await import('${moduleBase}/utils')
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
                        el.dispatchEvent(new CustomEvent('__hmrInstanceReplace', {
                          'detail': {
                            element: componentElement
                          }
                        }))

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
    config(_config: any, opt: any) {
      return {
        esbuild: {
          jsxFactory: 'h',
          jsxFragment: 'Fragment',
          jsxInject: `import { h, Fragment } from '${moduleBase}/jsx'`,
        },

        define: {
          __JSX_HMR_DEV__: opt.command === 'serve',
        },
      }
    },
  }
}
