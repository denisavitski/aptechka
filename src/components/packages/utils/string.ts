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
    .replace(
      /([a-z\d])([a-z\d]*)/gi,
      (_, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
    )
    .replace(/[^a-z\d]/gi, '')
}

function sliceAndModifyFirst(
  string: string,
  method: 'toUpperCase' | 'toLowerCase',
) {
  return string.slice(0, 1)[method]() + string.slice(1)
}

function sliceAndModify(
  string: string,
  everyWord = false,
  method: 'toUpperCase' | 'toLowerCase',
) {
  if (everyWord) {
    return string
      .split(' ')
      .map((v) => sliceAndModifyFirst(v, method))
      .join(' ')
  } else {
    return sliceAndModifyFirst(string, method)
  }
}

export function capitalize(string: string, everyWord = false) {
  return sliceAndModify(string, everyWord, 'toUpperCase')
}

export function uncapitalize(string: string, everyWord = false) {
  return sliceAndModify(string, everyWord, 'toLowerCase')
}

export function generateId(
  length: number,
  characters = 'abcdefghijklmnopqrstuvwxyz0123456789',
): string {
  const charactersLength = characters.length
  const key = crypto.getRandomValues(new Uint8Array(length))

  let generatedKey = ''
  for (let i = 0; i < length; i++) {
    generatedKey += characters.charAt(key[i] % charactersLength)
  }

  return generatedKey
}

export function isUppercase(string: string) {
  return /^\p{Lu}/u.test(string)
}

let textarea: HTMLTextAreaElement | null
export function decodeHtmlEntities(html: string) {
  if (!textarea) {
    textarea = document.createElement('textarea')
  }

  textarea.innerHTML = html
  return textarea.value
}

export function declension(
  number: number | string,
  one: string,
  few: string,
  many: string,
) {
  const n = typeof number === 'string' ? parseInt(number) : number

  if (n === 1) {
    return one
  }

  if (n % 100 >= 11 && n % 100 <= 14) {
    return many
  }

  const remainder = n % 10

  if (remainder === 1) {
    return one
  }

  if (remainder >= 2 && remainder <= 4) {
    return few
  }

  return many
}

export function getRandomChar(chars?: string) {
  let c = chars || 'abcdefghijklmnopqrstuvwxyz1234567890!@#$^&*()…æ_+-=;[]/~`'
  c = c[Math.floor(Math.random() * c.length)]
  return Math.random() > 0.5 ? c : c.toUpperCase()
}
