import { SolveFunction } from "../../common/SolveFunction";

const solve: SolveFunction = (input) => {
  const seats = input.split("\n");

  const findSeat = (code: string) => {
    const row = new Range(0, 127);
    const column = new Range(0, 7);
    for (const letter of code) {
      switch (letter) {
        case "F":
          row.takeBottom();
          break;
        case "B":
          row.takeTop();
          break;
        case "L":
          column.takeBottom();
          break;
        case "R":
          column.takeTop();
          break;
      }
    }
    const result = [row.getResult(), column.getResult()];
    return result;
  };

  const getSeatId = (code: string) => {
    const [row, column] = findSeat(code);
    return row * 8 + column;
  };

  const allSeats = seats.map(getSeatId).sort((a, b) => a - b);
  const answer1 = allSeats[allSeats.length - 1];

  const findGap = (sortedArray: number[]) => {
    for (var i = 0; i < sortedArray.length; i++) {
      var next = sortedArray[i] + 1;
      if (next !== sortedArray[i + 1]) {
        return next;
      }
    }
    return 0;
  };

  const answer2 = findGap(allSeats);

  return [answer1, answer2];
};

class Range {
  constructor(public min: number, public max: number) {}

  public takeTop() {
    this.min += this.halve();
  }

  public takeBottom() {
    this.max -= this.halve();
  }

  public getResult() {
    const { min, max } = this;
    if (min !== max) {
      throw new Error(`Result not yet found. Min ${min}, max ${max}.`);
    }
    return min;
  }

  private halve() {
    const { max, min } = this;
    return Math.floor((max - min + 1) / 2);
  }
}

module.exports = solve;
