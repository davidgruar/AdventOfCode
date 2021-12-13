export const partition = <T>(
  array: T[],
  predicate: (item: T) => boolean
): [T[], T[]] => {
  const trueValues: T[] = [];
  const falseValues: T[] = [];
  array.forEach((item) => {
    if (predicate(item)) {
      trueValues.push(item);
    } else {
      falseValues.push(item);
    }
  });
  return [trueValues, falseValues];
};
