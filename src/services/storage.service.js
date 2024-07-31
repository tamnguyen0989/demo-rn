import { tbUploaded } from "../constants/sqlite.constants";

export const getFiles = (db, onResolve) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM ${tbUploaded} WHERE type = 1`,
      null,
      (txObj, res) => {
        onResolve && onResolve(res.rows._array);
      }
    );
  });
};

export const uploadFile = (db, imageData) => {
  const { id, uri } = imageData;
  db.transaction((tx) => {
    tx.executeSql(`UPDATE ${tbUploaded} SET uri = ? WHERE id = ?`, [uri, id]);
  });
};

export const getBarcodeData = (db, onResolve) => {
  db.transaction((tx) => {
    tx.executeSql(
      `SELECT * FROM ${tbUploaded} WHERE type = 2`,
      null,
      (txObj, res) => {
        onResolve && onResolve(res.rows._array);
      }
    );
  });
};

export const uploadBarcodeData = (db, barcodeData) => {
  const { id, uri } = barcodeData;
  db.transaction((tx) => {
    tx.executeSql(`UPDATE ${tbUploaded} SET uri = ? WHERE id = ?`, [uri, id]);
  });
};
