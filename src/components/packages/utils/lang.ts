export function transliterate(
  text: string,
  options: {
    separator?: string
    lowercase?: boolean
    replaceNumbers?: boolean
    maxLength?: number
  } = {},
): string {
  const {
    separator = '-',
    lowercase = true,
    replaceNumbers = true,
    maxLength = 60,
  } = options

  const charMap: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'j',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'sh',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  }

  let result = text.replace(/[а-яё]/gi, (char) => {
    const lowerChar = char.toLowerCase()
    const replacement = charMap[lowerChar] || ''
    return char === lowerChar ? replacement : replacement.toUpperCase()
  })

  if (replaceNumbers) {
    const numberMap: Record<string, string> = {
      '0': 'zero',
      '1': 'one',
      '2': 'two',
      '3': 'three',
      '4': 'four',
      '5': 'five',
      '6': 'six',
      '7': 'seven',
      '8': 'eight',
      '9': 'nine',
    }
    result = result.replace(/[0-9]/g, (num) => numberMap[num] || num)
  }

  if (lowercase) {
    result = result.toLowerCase()
  }

  result = result
    .replace(/[^\w\-]+/g, separator)
    .replace(new RegExp(`\\${separator}+`, 'g'), separator)
    .replace(new RegExp(`(^\\${separator}|\\${separator}$)`, 'g'), '')

  if (maxLength > 0 && result.length > maxLength) {
    result = result
      .substring(0, maxLength)
      .replace(new RegExp(`\\${separator}[^\\${separator}]*$`), '')
  }

  return result
}
