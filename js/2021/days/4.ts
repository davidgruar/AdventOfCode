import { SolveFunction } from "../../common/SolveFunction";
import { partition } from "../../utils/partition";
import { Board } from "./4.Board";

const solve: SolveFunction = (input) => {
  const parts = input.split("\n\n");
  const numbers = parts[0].split(",").map(Number);
  const boards = parts
    .slice(1)
    .map((board) =>
      board.split("\n").map((line) => line.trim().split(/\s+/).map(Number))
    )
    .map((nums) => new Board(nums));

  const markBoards = (boards: Board[], n: number) => {
    for (let i = 0; i < boards.length; i++) {
      const board = boards[i];
      board.mark(n);
    }
  };

  let firstWinner: Board | null = null;
  let firstWinningNumber: number | null = null;
  let lastWinner: Board | null = null;
  let lastWinningNumber: number | null = null;

  let boardsToCheck = boards;
  for (const n of numbers) {
    if (boardsToCheck.length === 0) {
      break;
    }
    markBoards(boardsToCheck, n);
    const [winners, rest] = partition(boardsToCheck, (b) => b.isWinner);
    boardsToCheck = rest;
    if (winners.length > 0) {
      lastWinner = winners[winners.length - 1];
      lastWinningNumber = n;
      if (!firstWinner) {
        firstWinner = winners[0];
        firstWinningNumber = n;
      }
    }
  }

  const getAnswer = (board: Board, winningNumber: number) => {
    const unmarked = board.getUnmarked();
    const sum = unmarked.reduce((a, b) => a + b);
    return sum * winningNumber;
  };

  const answer1 = getAnswer(firstWinner!, firstWinningNumber!);
  const answer2 = getAnswer(lastWinner!, lastWinningNumber!);

  return [answer1, answer2];
};

module.exports = solve;
