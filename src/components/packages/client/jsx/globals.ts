import { ComponentElement } from './ComponentElement'

export const currentComponentElement = { value: null! as ComponentElement }

export const nextComponentAttributes: { value: { [key: string]: any } | null } =
  {
    value: null,
  }

export const contextStack = { value: [] as Array<Map<string, any>> }
