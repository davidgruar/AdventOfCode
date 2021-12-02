import fs from "fs";
import path from "path";
import util from "util";
import axios from "axios";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const sessionToken =
  "53616c7465645f5fc6bbc5829b7f97b6fffc34816cb5beb00c6a199e61fa47e1e3c8d58668e1064adf565d8340062d5a";

export async function getInput(day: string | number): Promise<string> {
  const filepath = path.resolve("inputs", `${day}.txt`);
  try {
    const input = await readFile(filepath, "utf8");
    return input;
  } catch {
    const response = await axios.get<string>(
      `https://adventofcode.com/2020/day/${day}/input`,
      {
        headers: { cookie: `session=${sessionToken}` },
      }
    );
    const input = response.data.trim();
    await writeFile(filepath, input);
    return input;
  }
}
