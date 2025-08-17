export function isObject(value: any): value is object {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function cloneDeep<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any
  }

  if (obj instanceof Node) {
    return obj
  }

  const clonedObj: any = Array.isArray(obj) ? [] : {}

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = cloneDeep(obj[key])
    }
  }

  return clonedObj
}

export function mergeDeep(
  target: object,
  source: object,
  isObjectFunction = isObject,
): object {
  for (const key in source) {
    if (isObjectFunction((source as any)[key])) {
      if (!(target as any)[key]) Object.assign(target, { [key]: {} })
      mergeDeep((target as any)[key], (source as any)[key], isObjectFunction)
    } else {
      Object.assign(target, { [key]: (source as any)[key] })
    }
  }

  return target
}

export function isNullish(value: any) {
  return value === null || typeof value === 'undefined'
}

export function compareObjects(obj1: any, obj2: any): boolean {
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  if ([obj1, obj2].some((v) => isNullish(v))) {
    return obj1 === obj2
  }

  if (Array.isArray(obj1)) {
    const maxArray = (obj1.length > obj2.length ? obj1 : obj2) as Array<any>
    const minArray = (obj1.length > obj2.length ? obj2 : obj1) as Array<any>
    return maxArray.every((item, index) =>
      compareObjects(item, minArray[index]),
    )
  }

  if (
    typeof obj1 !== 'object' ||
    obj1 instanceof Node ||
    (typeof obj1 === 'object' &&
      obj1.constructor.toString().startsWith('class'))
  ) {
    return obj1 === obj2
  }

  for (const key in obj1) {
    if (!obj2.hasOwnProperty(key)) {
      return false
    }

    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!compareObjects(obj1[key], obj2[key])) {
        return false
      }
    } else if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}

export function pick<T extends object, R extends keyof T>(
  object: T,
  keys: Array<R>,
): Pick<T, R> {
  const result = {} as Pick<T, R>

  for (const key in object) {
    if (keys.includes(key as any)) {
      ;(result as any)[key] = object[key]
    }
  }

  return result
}

export function omit<T extends object, R extends keyof T>(
  object: T | undefined,
  keys: Array<R>,
): Omit<T, R> {
  const result = {} as Omit<T, R>

  if (!object) {
    return result
  }

  for (const key in object) {
    if (!keys.includes(key as any)) {
      ;(result as any)[key] = object[key]
    }
  }

  return result
}

// https://stackoverflow.com/a/75567955
export function isESClass(fn: Function) {
  return (
    typeof fn === 'function' &&
    Object.getOwnPropertyDescriptor(fn, 'prototype')?.writable === false
  )
}

export function mixin(baseClass: any, ...mixins: any[]) {
  mixins.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        baseClass.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null),
      )
    })
  })
}
