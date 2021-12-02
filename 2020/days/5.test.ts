const day5 = require("./5");

describe("day 5", () => {
  test("part 1", () => {
    const sample = `BFFFBBFRRR
  FFFBBBFRRR
  BBFFBBFRLL`;

    const [answer1] = day5(sample);

    expect(answer1).toBe(820);
  });
});
