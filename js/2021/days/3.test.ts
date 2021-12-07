const day3 = require("./3");

describe("day 3", () => {
  const sample = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

  test("part 1", () => {
    const [answer1] = day3(sample);
    expect(answer1).toBe(198);
  });

  test("part 2", () => {
    const [, answer2] = day3(sample);
    expect(answer2).toBe(230);
  });
});
