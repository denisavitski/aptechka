function getActualValue(rule: CSSStyleRule, name: string) {
  const obj = rule.style.getPropertyValue(name)

  if (obj) {
    const stringValue = obj.toString()

    if (stringValue.startsWith('var')) {
      return getActualValue(rule, stringValue.slice(4, -1))
    } else {
      return stringValue
    }
  }
}

export function getRootVariables<
  T extends string,
  V extends { [key in T]: string } = { [key in T]: string }
>(...names: T[]): V {
  const variables = {} as V

  Array.from(document.styleSheets).forEach((stylesheet) => {
    Array.from(stylesheet.cssRules).forEach((rule) => {
      if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
        names.forEach((name) => {
          const value = getActualValue(rule, name)

          if (value) {
            variables[name] = value as any
          }
        })
      }
    })
  })

  names.forEach((name) => {
    if (!variables[name]) {
      console.warn(`variable named ${name} not found`)
    }
  })

  return variables
}
