export class Board {
  private static nextId = 0;
  public id = Board.nextId++;
  public hits: boolean[][] = [];
  public isWinner = false;
  constructor(public numbers: number[][]) {
    this.iterate({
      rowAction: (row) => (this.hits[row] = []),
      squareAction: (row, col) => this.setHit(row, col, false),
    });
  }

  public mark(num: number) {
    this.iterate({
      squareAction: (row, col) => {
        if (this.getValue(row, col) === num) {
          this.setHit(row, col);
          const colHits = this.hits.map((r) => r[col]);
          if (this.hits[row].every((x) => x) || colHits.every((x) => x)) {
            this.isWinner = true;
          }
        }
      },
    });
  }

  public getUnmarked() {
    const result: number[] = [];
    this.iterate({
      squareAction: (row, col) => {
        if (!this.isHit(row, col)) {
          result.push(this.numbers[row][col]);
        }
      },
    });
    return result;
  }

  private getValue(row: number, col: number) {
    return this.numbers[row][col];
  }

  private isHit(row: number, col: number) {
    return this.hits[row][col];
  }

  private setHit(row: number, col: number, value = true) {
    this.hits[row][col] = value;
  }

  private iterate({
    rowAction,
    squareAction,
  }: {
    rowAction?: (row: number) => void;
    squareAction?: (row: number, col: number) => void;
  }) {
    for (var row = 0; row < 5; row++) {
      rowAction?.(row);
      for (var col = 0; col < 5; col++) {
        squareAction?.(row, col);
      }
    }
  }
}
