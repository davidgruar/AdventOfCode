import { SolveFunction } from '../../common/SolveFunction';

const solve: SolveFunction = (input) => {
  const numbers = input.split("\n").map((n) => Number(n));
  const set = new Set(numbers);

  const getTwoNumbersSummingTo = (target: number) => {
    const found = numbers.find((n) => set.has(target - n));
    return found ? [found, target - found] : [];
  };

  const twoNumbers = getTwoNumbersSummingTo(2020);
  console.log("2 numbers adding to 2020:", twoNumbers);
  const product2 = twoNumbers.reduce((a, b) => a * b);

  const getThreeNumbersSummingTo = (target: number) => {
    for (var n of numbers) {
      const twoNumbers = getTwoNumbersSummingTo(target - n);
      if (twoNumbers.length > 0) {
        return [n, ...twoNumbers];
      }
    }
    return [];
  };

  const threeNumbers = getThreeNumbersSummingTo(2020);
  console.log("3 numbers adding to 2020:", threeNumbers);
  const product3 = threeNumbers.reduce((a, b) => a * b);

  return [product2, product3];
};

module.exports = solve;