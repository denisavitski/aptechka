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

export function parseAttributeValueAdvanced(value: string) {
  if (value === 'true') return true
  if (value === 'false') return false

  const num = Number(value)
  if (!isNaN(num) && value.trim() !== '') return num

  try {
    if (
      (value.startsWith('{') && value.endsWith('}')) ||
      (value.startsWith('[') && value.endsWith(']'))
    ) {
      return JSON.parse(value)
    }
  } catch (e) {}

  return value
}

export function getElementAttributesAdvanced(element: HTMLElement) {
  const attributes: Record<string, any> = {}

  Array.from(element.attributes).forEach((attr) => {
    attributes[attr.name] = parseAttributeValue(attr.value)
  })

  return attributes
}
