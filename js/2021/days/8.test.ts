const day8_2021 = require("./8");
const { decode } = day8_2021;

describe("day 8", () => {
  test("decode", () => {
    const decodeSample =
      "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab";
    const patterns = decodeSample.split(" ");
    const decoded = decode(patterns);

    expect(decoded).toEqual({
      abcdeg: 0,
      ab: 1,
      acdfg: 2,
      abcdf: 3,
      abef: 4,
      bcdef: 5,
      bcdefg: 6,
      abd: 7,
      abcdefg: 8,
      abcdef: 9,
    });
  });

  const sample = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
  edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
  fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
  fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
  aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
  fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
  dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
  bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
  egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
  gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

  test("part 1", () => {
    const [answer1] = day8_2021(sample);
    expect(answer1).toBe(26);
  });

  test("part 2", () => {
    const [, answer2] = day8_2021(sample);
    expect(answer2).toBe(61229);
  });
});
