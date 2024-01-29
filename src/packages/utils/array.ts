export function insert(arr: Array<any>, index: number, ...newItems: any[]) {
  return [...arr.slice(0, index), ...newItems, ...arr.slice(index)]
}
