import { SolveFunction } from "../../common/SolveFunction";

const solve: SolveFunction = (input) => {
  const fish = input.split(",").map(Number);

  const simulate = (fish: number[], days: number) => {
    const tally = Array<number>(9).fill(0);
    fish.forEach(f => tally[f]++);
    for (let i = 0; i < days; i++) {
      const newFish = tally[0];
      for (let i = 0; i < 8; i++) {
        tally[i] = tally[i + 1];
      }
      tally[8] = newFish;
      tally[6] += newFish;
    }
    return tally.reduce((a, b) => a + b);
  };

  const answer1 = simulate(fish, 80);
  const answer2 = simulate(fish, 256);

  return [answer1, answer2];
};

module.exports = solve;
