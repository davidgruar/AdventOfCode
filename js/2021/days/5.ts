import { SolveFunction } from "../../common/SolveFunction";

type Line = { x1: number; x2: number; y1: number; y2: number };

const solve: SolveFunction = (input) => {
  const inputLines = input.split("\n");
  const lines: Line[] = inputLines.map((line) => {
    const [[x1, y1], [x2, y2]] = line
      .split(" -> ")
      .map((p) => p.split(",").map(Number));
    return { x1, y1, x2, y2 };
  });

  const compare = (n1: number, n2: number) => n1 === n2 ? 0 : n1 < n2 ? -1 : 1;

  const visit = (lines: Line[]) => {
    const visited: Record<string, number> = {};
    lines.forEach(({ x1, y1, x2, y2 }) => {
      const dx = compare(x2, x1);
      const dy = compare(y2, y1);
      let done = false;
      for (let x = x1, y = y1; !done; x += dx, y += dy) {      
        const key = `${x},${y}`;
        visited[key] = (visited[key] ?? 0) + 1;
        done = x === x2 && y === y2;
      }
    });
    return visited;
  };

  const getAnswer = (lines: Line[]) => {
    const visited = visit(lines);
    return Object.values(visited).filter((n) => n > 1).length;
  };

  const straightLines = lines.filter((p) => p.x1 === p.x2 || p.y1 === p.y2);
  const answer1 = getAnswer(straightLines);
  const answer2 = getAnswer(lines);

  return [answer1, answer2];
};

module.exports = solve;
