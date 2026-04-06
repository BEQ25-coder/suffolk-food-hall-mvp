import { promises as fs } from "node:fs";
import path from "node:path";

const SOURCE_DB_DIR = path.join(process.cwd(), "db");
const RUNTIME_DB_DIR = path.join("/tmp", "suffolk-food-hall-mvp", "db");

function getSourceDbFilePath(filename: string) {
  return path.join(SOURCE_DB_DIR, filename);
}

function getRuntimeDbFilePath(filename: string) {
  return path.join(RUNTIME_DB_DIR, filename);
}

async function pathExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureRuntimeDbFile(filename: string) {
  const runtimePath = getRuntimeDbFilePath(filename);

  await fs.mkdir(path.dirname(runtimePath), { recursive: true });

  if (await pathExists(runtimePath)) {
    return runtimePath;
  }

  const sourcePath = getSourceDbFilePath(filename);

  if (await pathExists(sourcePath)) {
    const sourceContents = await fs.readFile(sourcePath, "utf8");
    await fs.writeFile(runtimePath, sourceContents, "utf8");
    return runtimePath;
  }

  await fs.writeFile(runtimePath, "[]\n", "utf8");
  return runtimePath;
}

async function resolveReadableDbFilePath(filename: string) {
  const runtimePath = getRuntimeDbFilePath(filename);

  if (await pathExists(runtimePath)) {
    return runtimePath;
  }

  const sourcePath = getSourceDbFilePath(filename);

  if (await pathExists(sourcePath)) {
    return sourcePath;
  }

  return ensureRuntimeDbFile(filename);
}

export async function readJsonArrayFile<T>(filename: string): Promise<T[]> {
  const filePath = await resolveReadableDbFilePath(filename);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error(`Expected ${filename} to contain a JSON array`);
  }

  return parsed as T[];
}

export async function writeJsonArrayFile<T>(filename: string, value: T[]) {
  const filePath = await ensureRuntimeDbFile(filename);
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
