import { tbUploaded } from "../constants/sqlite.constants";

export const getFiles = async (db) => {
  return await db.getAllAsync(`SELECT * FROM ${tbUploaded} WHERE type = 1`);
};

export const uploadFile = async (db, fileData) => {
  const { id, uri } = fileData;
  await db.runAsync(`UPDATE ${tbUploaded} SET uri = ? WHERE id = ?`, [uri, id]);
};

export const getBarcodeData = async (db) => {
  return await db.getAllAsync(`SELECT * FROM ${tbUploaded} WHERE type = 2`);
};
