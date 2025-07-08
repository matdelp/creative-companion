import { readdirSync, readFileSync } from "fs";
import { join } from "path";

import { config } from "dotenv";
config();
import { Client } from "pg";

const connectionString = process.env.DATABASE_URL;
const main = async () => {
  const dirPath = join(__dirname, "files");
  const files = readdirSync(dirPath);
  const pg_client = new Client({ connectionString });

  await pg_client.connect();

  for (const file of files) {
    const path = join(dirPath, file);
    const fileString = readFileSync(path).toString("utf-8");
    await pg_client.query(fileString);
  }
  await pg_client.end();
};
main();
