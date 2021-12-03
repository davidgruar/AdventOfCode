import { SolveFunction } from '../../common/SolveFunction';

const solve: SolveFunction = (input) => {
  const lines = input.split("\n");
  const width = lines[0].length;

  const run = (right: number, down: number) => {
    let [col, row] = [0, 0];
    let treeCount = 0;

    while (row < lines.length) {
      if (lines[row][col] === "#") {
        treeCount++;
      }
      [col, row] = [(col + right) % width, row + down];
    }

    return treeCount;
  };

  const answer1 = run(3, 1);

  const answer2 = [answer1, run(1, 1), run(5, 1), run(7, 1), run(1, 2)].reduce(
    (a, b) => a * b
  );

  return [answer1, answer2];
};

module.exports = solve;