import { tbClicked, tbUploaded } from "../constants/sqlite.constants";

export const initData = (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS ${tbClicked} (id INTEGER PRIMARY KEY AUTOINCREMENT, person INTEGER, photo INTEGER, scan INTEGER, signature INTEGER, vehicle INTEGER)
      `
    );
  });
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM ${tbClicked}`, null, (txObj, result) => {
      if (result.rows._array.length === 0)
        tx.executeSql(
          `INSERT INTO ${tbClicked} (person, photo, scan, signature, vehicle) VALUES (1, 10, 25, 6, 3)`
        );
    });
  });

  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${tbUploaded} (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT, type INTEGER)`
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM ${tbUploaded} WHERE type = 1`,
      null,
      (txObj, result) => {
        if (result.rows._array.length === 0)
          tx.executeSql(`INSERT INTO ${tbUploaded} (uri, type) VALUES ('', 1)`);
      }
    );
  });
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM ${tbUploaded} WHERE type = 2`,
      null,
      (txObj, result) => {
        if (result.rows._array.length === 0)
          tx.executeSql(`INSERT INTO ${tbUploaded} (uri, type) VALUES ('', 2)`);
      }
    );
  });
};
