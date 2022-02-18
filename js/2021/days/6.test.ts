const day6_2021 = require("./6");

describe("day 6", () => {
  const sample = "3,4,3,1,2";

  test("part 1", () => {
    const [answer1] = day6_2021(sample);
    expect(answer1).toBe(5934);
  });

  test("part 2", () => {
    const [, answer2] = day6_2021(sample);
    expect(answer2).toBe(26984457539);
  });
});
