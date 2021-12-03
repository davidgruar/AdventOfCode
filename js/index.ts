import fs from "fs";
import util from "util";
import { getInput } from "./getInput";
import dotEnv from "dotenv";

const readdir = util.promisify(fs.readdir);

dotEnv.config();
run().catch(console.error);

async function run() {
  const day = process.argv[2];
  const year = process.argv[3] || process.env["AOC_YEAR"];
  if (!year) {
    console.error("No year specified.");
    process.exit(1);
  }
  if (day) {
    runDay(year, day);
  } else {
    const files = await readdir(`./${year}/days`);
    const days = files.map(f => f.replace('.ts', '')).filter(f => /^\d+$/.test(f));
    days.forEach(day => runDay(year, day));
  }
}

function runDay(year: string, day: string) {
  const fn = require(`./${year}/days/${day}`) as (input: string) => [string, string];
  getInput(year, day).then((input) => {
      const [answer1, answer2] = fn(input);
      console.log(`*** Day ${day} ***`)
      console.log('Answer 1:', answer1);
      console.log('Answer 2:', answer2);
      console.log('');
  });
}
