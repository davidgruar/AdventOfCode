import { SolveFunction } from "../../common/SolveFunction";

const solve: SolveFunction = (input) => {
  const lines = input.split("\n");
  const numbers = lines.map((x) => parseInt(x, 2));
  const bitCount = lines[0].length;

  const range = (length: number) => [...Array(length).keys()];

  const partition = <T>(
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

  const partitionByBit = (
    array: number[],
    position: number
  ): [ones: number[], zeroes: number[]] =>
    partition(array, (n) => getBit(n, position) === 1);

  const getBit = (n: number, position: number) =>
    (n & (1 << position)) >> position;

  // Part 1

  const mostCommonBit = (position: number) => {
    const [ones, zeroes] = partitionByBit(numbers, position);
    return zeroes.length > ones.length ? 0 : 1;
  };

  const gamma = range(bitCount).reduce(
    (sum, i) => sum + (mostCommonBit(i) << i),
    0
  );
  const epsilonMask = (1 << bitCount) - 1;
  const epsilon = gamma ^ epsilonMask;
  const answer1 = gamma * epsilon;

  // Part 2

  const filter = (array: number[], position: number, leastCommon = false) => {
    const [ones, zeroes] = partitionByBit(array, position);
    if (leastCommon) {
      return ones.length < zeroes.length ? ones : zeroes;
    }
    return zeroes.length > ones.length ? zeroes : ones;
  };

  const filterToSingle = (leastCommon: boolean) => {
    let filtered = numbers;
    for (let i = 1; i <= bitCount; i++) {
      filtered = filter(filtered, bitCount - i, leastCommon);
      if (filtered.length === 1) {
        break;
      }
    }
    return filtered[0];
  }

  
  const oxygen = filterToSingle(false);
  const co2 = filterToSingle(true);
  const answer2 = oxygen * co2;

  return [answer1, answer2];
};

module.exports = solve;
