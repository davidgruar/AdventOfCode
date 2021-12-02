import { SolveFunction } from "./SolveFunction";

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"] as const; //, cid
  type Field = (typeof requiredFields)[number];

const solve: SolveFunction = (input) => {
  const batches = input.split("\n\n").map((batch) =>
    batch.split(/\s/).reduce<Record<Field, string>>((acc, item) => {
      const [key, value] = item.split(":");
      return { ...acc, [key]: value };
    }, {} as Record<Field, string>)
  );

  const validBatches1 = batches.filter((batch) =>
    requiredFields.every((field) => batch[field])
  );

  const isBetween = (value: string, min: number, max: number) => {
    const valueAsNumber = Number(value);
    return valueAsNumber >= min && valueAsNumber <= max;
  };

  const rules: Record<Field, (value: string) => boolean> = {
    byr: (x) => isBetween(x, 1920, 2002),
    iyr: (x) => isBetween(x, 2010, 2020),
    eyr: (x) => isBetween(x, 2020, 2030),
    hgt: (x) => {
      const [, height, unit] = /^(\d+)(in|cm)$/.exec(x) ?? [];
      switch (unit) {
        case "cm":
          return isBetween(height, 150, 193);
        case "in":
          return isBetween(height, 59, 76);
        default:
          return false;
      }
    },
    hcl: (x) => /^#[0-9a-f]{6}$/.test(x),
    ecl: (x) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(x),
    pid: (x) => /^\d{9}$/.test(x),
  };

  const validBatches2 = validBatches1.filter((batch) =>
    requiredFields.every((field) => {
      const value = batch[field];
      const rule = rules[field];
      return rule(value);
    })
  );

  return [validBatches1.length, validBatches2.length];
};

module.exports = solve;
