export const NODE_TYPE_ELEMENT = 1 as const
export const NODE_TYPE_TEXT = 3 as const
export const NODE_TYPE_COMMENT = 8 as const
export const NODE_TYPE_DOCUMENT = 9 as const

export const ACTION_CREATE = 0 as const
export const ACTION_REMOVE = 1 as const
export const ACTION_REPLACE = 2 as const
export const ACTION_UPDATE = 3 as const
export const ACTION_SET_ATTR = 4 as const
export const ACTION_REMOVE_ATTR = 5 as const
export const ACTION_SKIP = 6 as const
export const ACTION_PRESERVE = 7 as const

type ActionType =
  | typeof ACTION_CREATE
  | typeof ACTION_REMOVE
  | typeof ACTION_REPLACE
  | typeof ACTION_UPDATE
  | typeof ACTION_SET_ATTR
  | typeof ACTION_REMOVE_ATTR
  | typeof ACTION_SKIP
  | typeof ACTION_PRESERVE

interface PatchBase {
  type: ActionType
}

interface CreatePatch extends PatchBase {
  type: typeof ACTION_CREATE
  node: Node
}

interface RemovePatch extends PatchBase {
  type: typeof ACTION_REMOVE
}

interface ReplacePatch extends PatchBase {
  type: typeof ACTION_REPLACE
  node?: Node
  value?: string
}

interface UpdatePatch extends PatchBase {
  type: typeof ACTION_UPDATE
  attributes: AttributePatch[]
  children: Patch[]
}

interface AttributePatch extends PatchBase {
  type: typeof ACTION_SET_ATTR | typeof ACTION_REMOVE_ATTR
  name: string
  value?: string
}

interface SkipPatch extends PatchBase {
  type: typeof ACTION_SKIP
}

interface PreservePatch extends PatchBase {
  type: typeof ACTION_PRESERVE
}

type Patch =
  | CreatePatch
  | RemovePatch
  | ReplacePatch
  | UpdatePatch
  | AttributePatch
  | SkipPatch
  | PreservePatch
  | undefined

type CompareFn = (from: Node, to: Node) => boolean

interface SameComparators {
  name: CompareFn
  type: CompareFn
  value: CompareFn
}

const compare =
  (attr: string): CompareFn =>
  (from: Node, to: Node) =>
    (from as any)[`node${attr}`] === (to as any)[`node${attr}`]

const same: SameComparators = {
  name: compare('Name'),
  type: compare('Type'),
  value: compare('Value'),
}

function hasPermanentParent(node: Node | null | undefined): boolean {
  if (!node) return false
  let current: Node | null = node
  while (current) {
    if (
      current.nodeType === NODE_TYPE_ELEMENT &&
      (current as Element).hasAttribute('data-preserve')
    ) {
      return true
    }
    current = current.parentNode
  }
  return false
}

function attributes(from: Element, to: Element): AttributePatch[] {
  if (from.attributes.length === 0 && to.attributes.length === 0) {
    return []
  }

  const patches: AttributePatch[] = []
  const remove = new Map<string, string>()
  const update = new Map<string, string>()

  for (const attr of from.attributes) {
    remove.set(attr.name, attr.value)
  }

  for (const attr of to.attributes) {
    const fromAttr = remove.get(attr.name)
    if (attr.value === fromAttr) {
      remove.delete(attr.name)
    } else if (typeof fromAttr !== 'undefined') {
      remove.delete(attr.name)
      update.set(attr.name, attr.value)
    } else {
      update.set(attr.name, attr.value)
    }
  }

  for (const attr of remove.keys()) {
    patches.push({ type: ACTION_REMOVE_ATTR, name: attr })
  }

  for (const [attr, value] of update.entries()) {
    patches.push({ type: ACTION_SET_ATTR, name: attr, value })
  }

  return patches
}

function serialize(el: Element, data = true): string {
  let key = `${el.localName}`

  for (const { name, value } of el.attributes) {
    if (data && name.startsWith('data-')) continue
    key += `[${name}=${value}]`
  }

  key += el.innerHTML

  return key
}

function getKey(el: Element): string {
  switch (el.tagName) {
    case 'BASE':
    case 'TITLE':
      return el.localName
    case 'META': {
      if (el.hasAttribute('name'))
        return `meta[name="${el.getAttribute('name')}"]`
      if (el.hasAttribute('property'))
        return `meta[name="${el.getAttribute('property')}"]`
      break
    }
    case 'LINK': {
      if (el.hasAttribute('rel') && el.hasAttribute('href'))
        return `link[rel="${el.getAttribute('rel')}"][href="${el.getAttribute('href')}"]`
      if (el.hasAttribute('href'))
        return `link[href="${el.getAttribute('href')}"]`
      break
    }
  }
  return serialize(el)
}

function cachebust(src: string): string {
  const [base, query = ''] = src.split('?')
  return `${base}?t=${Date.now()}&${query.replace(/t=\d+/g, '')}`
}

function clone(node: Node): Node {
  if (
    node.nodeType === NODE_TYPE_ELEMENT &&
    (node as Element).hasAttribute('data-persist')
  ) {
    return node
  }

  if (
    node.nodeType === NODE_TYPE_ELEMENT &&
    (node as Element).localName === 'script'
  ) {
    const script = document.createElement('script')

    for (let { name, value } of (node as Element).attributes) {
      // if (name === 'src') {
      //   value = cachebust(value)
      // }
      script.setAttribute(name, value)
    }

    script.innerHTML = (node as Element).innerHTML

    return script
  }

  return node.cloneNode(true)
}

function uniqueChildren(from: Element, to: Element): Patch[] {
  if (from.children.length === 0 && to.children.length === 0) {
    return []
  }

  const patches: Patch[] = []
  const remove = new Map<string, Element>()
  const update = new Map<string, Element>()
  const add = new Map<string, Element>()

  for (const child of from.children) {
    remove.set(getKey(child), child)
  }

  for (const child of to.children) {
    const key = getKey(child)
    const fromEl = remove.get(key)

    if (fromEl) {
      if (serialize(child, false) !== serialize(fromEl, false)) {
        update.set(key, clone(child) as Element)
      }
    } else {
      add.set(key, clone(child) as Element)
    }

    remove.delete(key)
  }

  for (const node of from.childNodes) {
    if (node.nodeType === NODE_TYPE_ELEMENT) {
      const key = getKey(node as Element)

      if (remove.has(key)) {
        patches.push({ type: ACTION_REMOVE })
        continue
      } else if (update.has(key)) {
        const nodeTo = update.get(key)

        patches.push({
          type: ACTION_UPDATE,
          attributes: attributes(node as Element, nodeTo as Element),
          children: children(node as Element, nodeTo as Element),
        })

        continue
      }
    }
    patches.push(undefined)
  }

  for (const node of add.values()) {
    patches.push({ type: ACTION_CREATE, node: clone(node) })
  }

  return patches
}

function children(from: Element, to: Element): Patch[] {
  const patches: Patch[] = []
  const len = Math.max(from.childNodes.length, to.childNodes.length)

  for (let i = 0; i < len; i++) {
    const a = from.childNodes.item(i)
    const b = to.childNodes.item(i)

    if (hasPermanentParent(a) || hasPermanentParent(b)) {
      patches[i] = { type: ACTION_PRESERVE }
    } else {
      patches[i] = diff(a, b)
    }
  }

  return patches
}

export function diff(from: Node | undefined, to: Node | undefined): Patch {
  if (hasPermanentParent(from) || hasPermanentParent(to)) {
    return { type: ACTION_PRESERVE }
  }

  if (!from) {
    return { type: ACTION_CREATE, node: clone(to!) }
  }

  if (!to) {
    return hasPermanentParent(from)
      ? { type: ACTION_PRESERVE }
      : { type: ACTION_REMOVE }
  }

  if (same.type(from, to)) {
    if (from.nodeType === NODE_TYPE_TEXT) {
      const a = from.nodeValue
      const b = to.nodeValue

      if (a?.trim().length === 0 && b?.trim().length === 0) {
        return { type: ACTION_SKIP }
      }
    }

    if (from.nodeType === NODE_TYPE_ELEMENT) {
      if (same.name(from as Element, to as Element)) {
        const childFn =
          (from as Element).tagName === 'HEAD' ? uniqueChildren : children

        return {
          type: ACTION_UPDATE,
          attributes: attributes(from as Element, to as Element),
          children: childFn(from as Element, to as Element),
        }
      }

      return {
        type: ACTION_REPLACE,
        node: clone(to),
      }
    } else if (from.nodeType === NODE_TYPE_DOCUMENT) {
      return diff(
        (from as Document).documentElement,
        (to as Document).documentElement,
      )
    } else {
      if (same.value(from, to)) {
        return { type: ACTION_SKIP }
      }

      return {
        type: ACTION_REPLACE,
        value: to.nodeValue!,
      }
    }
  }

  return {
    type: ACTION_REPLACE,
    node: clone(to),
  }
}

function patchAttributes(el: Element, patches: AttributePatch[]): void {
  if (patches.length === 0) {
    return
  }

  for (const { type, name, value } of patches) {
    if (type === ACTION_REMOVE_ATTR) {
      el.removeAttribute(name)
    } else if (type === ACTION_SET_ATTR) {
      el.setAttribute(name, value!)
    }
  }
}

function updateScripts(node: Node) {
  if (node instanceof HTMLElement) {
    if (node.tagName === 'SCRIPT') {
      node = clone(node)
    } else {
      node.querySelectorAll('script').forEach((script) => {
        script.replaceWith(clone(script))
      })
    }
  }

  return node
}

export async function patch(
  parent: Node,
  PATCH: Patch,
  child?: Node,
): Promise<void> {
  if (!PATCH) return

  let el: Node | null
  if (parent.nodeType === NODE_TYPE_DOCUMENT) {
    parent = (parent as Document).documentElement
    el = parent
  } else if (!child) {
    el = parent
  } else {
    el = child
  }

  switch (PATCH.type) {
    case ACTION_PRESERVE: {
      return
    }

    case ACTION_CREATE: {
      let { node } = PATCH as CreatePatch

      node = updateScripts(node)

      parent.appendChild(node)
      return
    }

    case ACTION_REMOVE: {
      if (!el) {
        return
      }
      parent.removeChild(el)
      return
    }

    case ACTION_REPLACE: {
      if (!el) {
        return
      }
      let { node, value } = PATCH as ReplacePatch

      if (typeof value === 'string') {
        el.nodeValue = value
        return
      }

      if (node) {
        node = updateScripts(node)

        if (el instanceof Element && node instanceof Element) {
          el.replaceWith(node)
        } else if (el.parentNode) {
          el.parentNode.replaceChild(node, el)
        }
      }

      return
    }

    case ACTION_UPDATE: {
      if (!el || el.nodeType !== NODE_TYPE_ELEMENT) {
        return
      }
      const { attributes, children } = PATCH as UpdatePatch

      patchAttributes(el as Element, attributes)

      const elements = Array.from(el.childNodes)

      await Promise.all(
        children.map((child, index) => patch(el!, child, elements[index])),
      )
      return
    }

    case ACTION_SKIP: {
      return
    }
  }
}

export async function morph(from: Node, to: Node): Promise<void> {
  const patches = diff(from, to)
  await patch(document, patches)
}
