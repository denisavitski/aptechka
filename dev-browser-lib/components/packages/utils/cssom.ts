export function getRootVariables<
  T extends string,
  V extends { [key in T]: string } = { [key in T]: string }
>(...names: T[]): V {
  const variables = {} as V

  Array.from(document.styleSheets).forEach((stylesheet) => {
    Array.from(stylesheet.cssRules).forEach((rule) => {
      if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
        names.forEach((name) => {
          const value = rule.styleMap.get(name)

          if (value) {
            variables[name] = value.toString() as any
          } else {
            console.warn(`variable named ${name} not found`)
          }
        })
      }
    })
  })

  return variables
}
