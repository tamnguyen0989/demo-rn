import { tbClicked } from "../constants/sqlite.constants";

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
