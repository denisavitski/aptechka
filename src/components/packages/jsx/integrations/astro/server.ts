import type { AstroComponentMetadata, NamedSSRLoadedRendererValue } from 'astro'

async function check(Component: any) {
  return typeof Component === 'function'
}

async function renderToStaticMarkup(
  Component: any,
  props: Record<string, any>,
  slotted: Record<string, any>,
  metadata?: AstroComponentMetadata,
) {
  return { html: 'TODO' }
}

const renderer: NamedSSRLoadedRendererValue = {
  name: 'aptechka',
  check,
  renderToStaticMarkup,
  supportsAstroStaticSlot: true,
}

export default renderer
