export async function whenDefined<T extends keyof HTMLElementTagNameMap>(
  ...elements: Array<T>
) {
  return await Promise.all(elements.map((e) => customElements.whenDefined(e)))
}
