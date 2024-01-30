export function kebabToCamel(kebab: string, capitalize = false) {
  let camel = ''

  kebab.split('-').forEach((part, i) => {
    if (i === 0 && !capitalize) {
      camel += part
    } else {
      const firstLetter = part[0]
      const restLetters = part.slice(1)
      const capitalized = firstLetter.toUpperCase() + restLetters

      camel += capitalized
    }
  })

  return camel
}

export function camelToKebab(camelCaseString: string) {
  return camelCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function snakeToDotted(snake: string) {
  return snake.split('_').join('.')
}

export function toPascalCase(str: string) {
  if (/^[a-z\d]+$/i.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return str
    .replace(/([a-z\d])([a-z\d]*)/gi, (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
    .replace(/[^a-z\d]/gi, '')
}

export function capitalize(string: string, everyWord = false) {
  const cfl = (string: string) => {
    return string.slice(0, 1).toUpperCase() + string.slice(1)
  }

  if (everyWord) {
    return string
      .split(' ')
      .map((v) => cfl(v))
      .join(' ')
  } else {
    return cfl(string)
  }
}
