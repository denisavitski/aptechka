export interface CustomConstructorParameters {
  tag: string
  attributes: any
  children: Array<any>
}

export interface CustomConstuctor extends Function {
  new (parameters: CustomConstructorParameters): void
}

export const customConstructors = new Map<string, CustomConstuctor>()
