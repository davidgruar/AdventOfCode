import fs from "fs";
import path from "path";
import util from "util";
import axios from "axios";

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


export async function getInput(day: string | number): Promise<string> {
  const filepath = path.resolve("inputs", `${day}.txt`);
  try {
    const input = await readFile(filepath, "utf8");
    return input;
  } catch {
    const sessionToken = process.env["SESSION_TOKEN"];
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
