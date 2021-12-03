import { SolveFunction } from "../../common/SolveFunction";

const solve: SolveFunction = (input) => {
  const groups = input.split("\n\n").map(g => g.split("\n"));

  const letterSets = groups.map(g => new Set(g.join('')));
  const answer1 = letterSets.map(s => s.size).reduce((a, b) => a + b);

  const intersect = <T>(a: Set<T>, b: Set<T>) => new Set(Array.from(a).filter(item => b.has(item)));

  const setGroups = groups.map(g => g.map(p => new Set(p)));
  const intersections = setGroups.map(g => g.reduce(intersect));
  const answer2 = intersections.map(s => s.size).reduce((a, b) => a + b);

  return [answer1, answer2];
};

module.exports = solve;
