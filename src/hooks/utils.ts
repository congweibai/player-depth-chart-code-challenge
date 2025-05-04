export function insertWithMaxLength<T>(
  array: T[],
  element: T,
  index: number,
  maxLength: number
): T[] {
  let newArray: T[];

  if (index === -1) {
    if (array.length < maxLength) {
      return [...array, element];
    } else {
      return [...array.slice(0, array.length - 1), element];
    }
  } else {
    // Clamp index to valid range within array
    const safeIndex = Math.min(Math.max(index, 0), array.length);
    newArray = [
      ...array.slice(0, safeIndex),
      element,
      ...array.slice(safeIndex),
    ];
  }

  // Trim the array if it exceeds max length
  return newArray.slice(0, maxLength);
}

export function removeItemAtIndex<T>(array: T[], index: number): T[] {
  if (index < 0 || index >= array.length) {
    return array;
  }
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
