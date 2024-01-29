export function parseAttribute(element: HTMLElement, attributeName: string) {
  return parseAttributeValue(element.getAttribute(attributeName))
}

export function parseAttributeValue(value: string | null | undefined) {
  if (value == undefined) {
    return null
  } else if (!value) {
    return true
  } else if (!isNaN(Number(value))) {
    return Number(value)
  } else if (value === 'true') {
    return true
  } else if (value === 'false') {
    return false
  } else {
    return value
  }
}
