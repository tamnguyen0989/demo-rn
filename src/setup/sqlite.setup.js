import * as SQLite from "expo-sqlite";

import { tbClicked, tbUploaded } from "../constants/sqlite.constants";

//Connection is initialised globally
const db = SQLite.openDatabaseSync("demo.db");

export async function initDatabase(db) {
  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS ${tbClicked} (id INTEGER PRIMARY KEY AUTOINCREMENT, person INTEGER, photo INTEGER, scan INTEGER, signature INTEGER, vehicle INTEGER)`
  );

  const clickeds = await db.getAllAsync(`SELECT * FROM ${tbClicked}`);

  if (clickeds?.length === 0)
    await db.runAsync(
      `INSERT INTO ${tbClicked} (person, photo, scan, signature, vehicle) VALUES (1, 10, 25, 6, 3)`
    );

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS ${tbUploaded} (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT, type INTEGER)`
  );

  const uploadedImages = await db.getAllAsync(
    `SELECT * FROM ${tbUploaded} WHERE type = 1`
  );
  if (uploadedImages?.length === 0)
    await db.runAsync(`INSERT INTO ${tbUploaded} (uri, type) VALUES ('', 1)`);

  const uploadedSignatures = await db.getAllAsync(
    `SELECT * FROM ${tbUploaded} WHERE type = 2`
  );
  if (uploadedSignatures?.length === 0)
    await db.runAsync(`INSERT INTO ${tbUploaded} (uri, type) VALUES ('', 2)`);
}

export default db;
