import { SolveFunction } from "../../common/SolveFunction";

type ChildBag = {
  colour: string;
  number: number;
};

const solve: SolveFunction = (input) => {
  const rules: Record<string, ChildBag[]> = {};
  for (const line of input.split("\n")) {
    const [, colour, contents] = /(.+) bags contain (.+)\./.exec(line)!;
    if (contents === "no other bags") {
      rules[colour] = [];
    } else {
      const children = contents.split(",").map((child) => {
        const matches = /(\d+) (.+) bags?/.exec(child)!;
        const [, number, colour] = matches;
        return { colour, number: Number(number) };
      });
      rules[colour] = children;
    }
  }

  const findParents = (colour: string) => Object.entries(rules)
    .filter(([_, children]) => children.find(c => c.colour === colour))
    .map(([colour]) => colour);

  const findAncestors = (colour: string): string[][] => {
    const parents = findParents(colour);
    if (parents.length === 0) {
      return [[colour]];
    }
    const ancestors = parents.map((parent) => findAncestors(parent).map(ancestors => [...ancestors, colour]));
    return [
      [...parents, colour],
      ...ancestors.reduce((a, b) => a.concat(b)),
    ];
  }

  const rulesWithGold = findAncestors('shiny gold');
  console.log(rulesWithGold);

  return [0, 0];
};

module.exports = solve;
