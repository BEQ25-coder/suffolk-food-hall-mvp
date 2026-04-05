import { promises as fs } from "node:fs";
import path from "node:path";

function resolveDbFilePath(filename: string) {
  return path.join(process.cwd(), "db", filename);
}

async function ensureDbFile(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]\n", "utf8");
  }
}

export async function readJsonArrayFile<T>(filename: string): Promise<T[]> {
  const filePath = resolveDbFilePath(filename);
  await ensureDbFile(filePath);

  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error(`Expected ${filename} to contain a JSON array`);
  }

  return parsed as T[];
}

export async function writeJsonArrayFile<T>(filename: string, value: T[]) {
  const filePath = resolveDbFilePath(filename);
  await ensureDbFile(filePath);
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
