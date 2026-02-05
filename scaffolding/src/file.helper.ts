import fs from "fs";
export function directoryExists(path: string) {
  try {
    fs.accessSync(path);
    return true;
  } catch (error) {
    return false;
  }
}
