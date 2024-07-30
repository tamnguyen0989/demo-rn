import { tbClicked, tbUploaded } from "../constants/sqlite.constants";
import { getDataSource } from "../typeorm";
import { Clicked } from "../typeorm/entity/Clicked";

export const initData = (db) => {
  db.transaction((tx) => {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS ${tbClicked} (id INTEGER PRIMARY KEY AUTOINCREMENT, person INTEGER, photo INTEGER, scan INTEGER, signature INTEGER, vehicle INTEGER)
      `);
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
      `CREATE TABLE IF NOT EXISTS ${tbUploaded} (id INTEGER PRIMARY KEY AUTOINCREMENT, uri TEXT)`
    );
  });
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM ${tbUploaded}`, null, (txObj, result) => {
      if (result.rows._array.length === 0)
        tx.executeSql(`INSERT INTO ${tbUploaded} (uri) VALUES ('')`);
    });
  });
};

export const getClickedNumber = async () => {
  const AppDataSource = await getDataSource();
  const clickedRepo = AppDataSource.getRepository(Clicked);
  return await clickedRepo.find();
};

export const createClicked = async (clicked) => {
  const AppDataSource = await getDataSource();
  const clickedRepo = AppDataSource.getRepository(Clicked);
  return await clickedRepo.save(clicked);
};

export const updateClickedNumber = async (clicked) => {
  const AppDataSource = await getDataSource();
  const clickedRepo = AppDataSource.getRepository(Clicked);
  return await clickedRepo.save(clicked);
};
