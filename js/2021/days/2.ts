import { SolveFunction } from "../../common/SolveFunction";

const solve: SolveFunction = (input) => {
  const lines = input.split("\n");
  const directions: [string, number][] = lines.map((line) => {
    const [direction, value] = line.split(" ");
    return [direction, Number(value)];
  });

  let hPos = 0,
    depth = 0;
  directions.forEach(([direction, value]) => {
    switch (direction) {
      case "forward":
        hPos += value;
        break;
      case "down":
        depth += value;
        break;
      case "up":
        depth -= value;
        break;
    }
  });
  const answer1 = hPos * depth;

  hPos = 0;
  depth = 0;
  let aim = 0;
  directions.forEach(([direction, value]) => {
    switch (direction) {
      case "forward":
        hPos += value;
        depth += value * aim;
        break;
      case "down":
        aim += value;
        break;
      case "up":
        aim -= value;
        break;
    }
  });
  const answer2 = hPos * depth;

  return [answer1, answer2];
};

module.exports = solve;
