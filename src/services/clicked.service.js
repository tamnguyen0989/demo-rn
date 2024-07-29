import { tbClicked } from './constants';

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
};

export const getClickedNumber = (db, onResolve) => {
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM ${tbClicked}`, null, (txObj, res) => {
      onResolve && onResolve(res.rows._array);
    });
  });
};

export const updateClickedNumber = async (db, clicked) => {
  const { id, person, photo, scan, signature, vehicle } = clicked;
  db.transaction((tx) => {
    tx.executeSql(
      `UPDATE ${tbClicked} SET person = ?, photo = ?, scan = ?, signature = ?, vehicle = ? WHERE id = ? `,
      [person, photo, scan, signature, vehicle, id]
    );
  });
};
