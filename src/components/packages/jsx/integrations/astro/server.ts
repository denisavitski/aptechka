import { indexMap, render } from 'aptechka/jsx'
import type { AstroComponentMetadata, NamedSSRLoadedRendererValue } from 'astro'
import 'global-jsdom/register'

async function check(Component: any) {
  return typeof Component === 'function'
}

async function renderToStaticMarkup(
  Component: any,
  props: Record<string, any>,
  slotted: Record<string, any>,
  metadata?: AstroComponentMetadata,
) {
  indexMap.clear()

  const container = document.createElement('div')

  const element = render(container, Component, props)

  if (element instanceof HTMLElement) {
    const slots = element.querySelectorAll('slot')

    slots.forEach((slot) => {
      const name = slot.getAttribute('name')

      if (name && slotted[name]) {
        slot.outerHTML = slotted[name]
      } else if (!name && slotted.default) {
        slot.outerHTML = slotted.default
      }
    })
  }

  return { html: element ? element.outerHTML : '' }
}

const renderer: NamedSSRLoadedRendererValue = {
  name: 'aptechka',
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true,
}

export default renderer
