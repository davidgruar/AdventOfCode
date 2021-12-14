const day5_2021 = require("./5");

describe("day 5", () => {
  const sample = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

  test("part 1", () => {
    const [answer1] = day5_2021(sample);
    expect(answer1).toBe(5);
  });

  test("part 2", () => {
    const [, answer2] = day5_2021(sample);
    expect(answer2).toBe(12);
  });
});
