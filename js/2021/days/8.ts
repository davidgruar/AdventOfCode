import { SolveFunction } from "../../common/SolveFunction";

type Display = { patterns: string[]; digits: string[] };

const decode = (patterns: string[]): Record<string, number> => {
  const getPatternsOfLength = (length: number) =>
    patterns.filter((p) => p.length === length).map((s) => Array.from(s));
  const [one] = getPatternsOfLength(2);
  const [four] = getPatternsOfLength(4);
  const [seven] = getPatternsOfLength(3);
  const [eight] = getPatternsOfLength(7);
  const twoThreeFive = getPatternsOfLength(5);
  const zeroSixNine = getPatternsOfLength(6);
  const three = twoThreeFive.find((p) => one.every((s) => p.includes(s)))!;

  const b = four.find((s) => !three.includes(s))!;
  const five = twoThreeFive.find((p) => p.includes(b))!;
  const f = five.find((s) => one.includes(s))!;
  const two = twoThreeFive.find((p) => !p.includes(f))!;
  const d = four.find((s) => three.includes(s) && !one.includes(s))!;
  const zero = zeroSixNine.find((p) => !p.includes(d))!;
  const c = one.find((s) => s !== f)!;
  const six = zeroSixNine.find((p) => p !== zero && !p.includes(c))!;
  const nine = zeroSixNine.find((p) => p !== zero && p !== six)!;

  const mapPattern = (pattern: string[]) => pattern.sort().join("");

  return {
    [mapPattern(zero)]: 0,
    [mapPattern(one)]: 1,
    [mapPattern(two)]: 2,
    [mapPattern(three)]: 3,
    [mapPattern(four)]: 4,
    [mapPattern(five)]: 5,
    [mapPattern(six)]: 6,
    [mapPattern(seven)]: 7,
    [mapPattern(eight)]: 8,
    [mapPattern(nine)]: 9,
  };
};

const getValue = (display: Display): number => {
  const decoded = decode(display.patterns);
  const findPattern = (pattern: string) => {
    const sorted = pattern.split("").sort().join("");
    return decoded[sorted];
  };
  return Number(display.digits.map(findPattern).join(""));
};

const solve: SolveFunction = (input) => {
  const lines = input.split("\n");
  const displays: Display[] = lines.map((line) => {
    const [patterns, digits] = line
      .split(" | ")
      .map((group) => group.split(" "));
    return { patterns, digits };
  });

  const allDigits = displays.flatMap((d) => d.digits);

  const answer1 = allDigits.filter((d) =>
    [2, 4, 3, 7].includes(d.length)
  ).length;

  const answer2 = displays.map((d) => getValue(d)).reduce((a, b) => a + b);

  return [answer1, answer2];
};

module.exports = solve;
module.exports.decode = decode;
