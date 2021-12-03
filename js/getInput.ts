import fs from "fs";
import path from "path";
import util from "util";
import axios from "axios";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


export async function getInput(year: string | number, day: string | number): Promise<string> {
  const filepath = path.resolve(`${year}/inputs`, `${day}.txt`);
  try {
    const input = await readFile(filepath, "utf8");
    return input;
  } catch {
    const sessionToken = process.env["AOC_SESSION_TOKEN"];
    const response = await axios.get<string>(
      `https://adventofcode.com/${year}/day/${day}/input`,
      {
        headers: { cookie: `session=${sessionToken}` },
      }
    );
    const input = response.data.trim();
    await writeFile(filepath, input);
    return input;
  }
}
