export function insert(arr: Array<any>, index: number, ...newItems: any[]) {
  return [...arr.slice(0, index), ...newItems, ...arr.slice(index)]
}

export function shiftArray<T>(arr: T[], positions: number): T[] {
  const len = arr.length

  // Обрабатываем отрицательное количество позиций
  positions = positions % len

  // Создаем новый массив для результата
  const result = new Array(len)

  for (let i = 0; i < len; i++) {
    // Вычисляем новую позицию для элемента
    const newPos = (i + positions) % len

    // Устанавливаем элемент на новую позицию
    result[newPos] = arr[i]
  }

  return result
}
