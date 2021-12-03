import { SolveFunction } from '../../common/SolveFunction';

const solve: SolveFunction = (input) => {
  const lines = input.split("\n");
  const passwords = lines.map((x) => new Password(x));

  const valid1 = passwords.filter((p) => p.isValid1());

  const valid2 = passwords.filter((p) => p.isValid2());

  return [valid1.length, valid2.length];
};

class Password {
  constructor(input: string) {
    const re = /(\d+)-(\d+) ([a-z]): ([a-z]+)/;
    const [, min, max, letter, value] = re.exec(input)!;
    this.policy = {
      min: Number(min),
      max: Number(max),
      letter,
    };
    this.value = value;
  }

  public policy: {
    letter: string;
    min: number;
    max: number;
  };

  public value: string;

  public isValid1(): boolean {
    const { letter, min, max } = this.policy;
    const occurrences = Array.from(this.value).filter((c) => c === letter)
      .length;
    return occurrences >= min && occurrences <= max;
  }

  public isValid2(): boolean {
    const { letter, min, max } = this.policy;
    const inFirstPosition = this.value[min - 1] === letter;
    const inSecondPosition = this.value[max - 1] === letter;
    return inFirstPosition !== inSecondPosition;
  }
}

module.exports = solve;