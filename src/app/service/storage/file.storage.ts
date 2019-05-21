import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as packageJson from "../../../../package.json";

const DIRECTORY = path.join(os.homedir(), process.env.NODE_ENV === "production" ? ".quinvoice" : ".quinvoice-dev");

export const write = (data: any, key: string) => {
  if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY);
  }

  fs.writeFileSync(
    path.join(DIRECTORY, `${key}.json`),
    JSON.stringify({ data, version: (packageJson as any).version })
  );
};

export const read = <T>(key: string): T | null => {
  const file = path.join(DIRECTORY, `${key}.json`);

  if (!fs.existsSync(file)) {
    return null;
  }

  const buffer = fs.readFileSync(file);

  return JSON.parse(buffer.toString()).data;
};
