import { SolveFunction } from "../../common/SolveFunction";

const solve: SolveFunction = (input) => {
  const positions = input.split(",").map(Number);

  const minPosition = Math.min(...positions);
  const maxPosition = Math.max(...positions);

  const findAnswer = (
    calculateFuel: (position: number, target: number) => number
  ) => {
    const fuels: number[] = [];
    for (let i = minPosition; i <= maxPosition; i++) {
      const fuel = positions
        .map((p) => calculateFuel(p, i))
        .reduce((a, b) => a + b);
      fuels.push(fuel);
    }
    return Math.min(...fuels);
  };

  const answer1 = findAnswer((p, i) => Math.abs(p - i));

  const answer2 = findAnswer((p, i) => {
    const distance = Math.abs(p - i);
    return (distance * (distance + 1)) / 2;
  });

  return [answer1, answer2];
};

module.exports = solve;
