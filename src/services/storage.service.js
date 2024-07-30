import { tbUploaded } from "../constants/sqlite.constants";

export const getFiles = (db, onResolve) => {
  db.transaction((tx) => {
    tx.executeSql(`SELECT * FROM ${tbUploaded}`, null, (txObj, res) => {
      onResolve && onResolve(res.rows._array);
    });
  });
};

export const uploadFile = (db, imageData) => {
  const { id, uri } = imageData;
  db.transaction((tx) => {
    tx.executeSql(`UPDATE ${tbUploaded} SET uri = ? WHERE id = ? `, [uri, id]);
  });
};
