import { SolveFunction } from "../../common/SolveFunction";

const solve: SolveFunction = (input) => {
  const depths = input.split("\n").map(Number);
  // const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  let answer1 = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      answer1++;
    }
  }

  let answer2 = 0;
  for (let i = 3; i < depths.length; i++) {
    const window = depths[i] + depths[i - 1] + depths[i - 2];
    const prevWindow = depths[i - 1] + depths[i - 2] + depths[i - 3];
    if (window > prevWindow) {
      answer2++;
    }
  }

  return [answer1, answer2];
};

module.exports = solve;
