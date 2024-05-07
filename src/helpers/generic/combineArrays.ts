export function combineArrays<T>(arr1: T[], arr2: T[]): T[] {
  return [...arr1, ...arr2];
}
