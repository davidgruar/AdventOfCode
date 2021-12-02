import fs from "fs";
import util from "util";
import { getInput } from "./getInput";

const readdir = util.promisify(fs.readdir);

run();

async function run() {
  const day = process.argv[2];
  if (day) {
    runDay(day);
  } else {
    const files = await readdir("./days");
    const days = files.map(f => f.replace('.ts', '')).filter(f => /^\d+$/.test(f));
    days.forEach(runDay);
  }
}

function runDay(day: string) {
  const fn = require(`./days/${day}`) as (input: string) => [string, string];
  getInput(day).then((input) => {
      const [answer1, answer2] = fn(input);
      console.log(`*** Day ${day} ***`)
      console.log('Answer 1:', answer1);
      console.log('Answer 2:', answer2);
      console.log('');
  });
}
