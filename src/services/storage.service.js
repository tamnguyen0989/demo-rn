import { tbUploaded } from "../constants/sqlite.constants";
import { uploadedSto } from "../constants/storage.constant";
import { getWebSto, setWebSto } from "../utils/helper";

export const getFiles = async (db) => {
  if (!db) {
    const files = getWebSto(uploadedSto);
    return files.filter((item) => item.type === 1);
  }
  return await db.getAllAsync(`SELECT * FROM ${tbUploaded} WHERE type = 1`);
};

export const uploadFile = async (db, fileData) => {
  const { id, uri } = fileData;
  if (!db) {
    const files = getWebSto(uploadedSto);
    files.forEach((file) => {
      if (id === file.id) file.uri = uri;
    });
    setWebSto(files);
  }
  await db.runAsync(`UPDATE ${tbUploaded} SET uri = ? WHERE id = ?`, [uri, id]);
};

export const getBarcodeData = async (db) => {
  if (!db) {
    const files = getWebSto(uploadedSto);
    return files.filter((item) => item.type === 2);
  }
  return await db.getAllAsync(`SELECT * FROM ${tbUploaded} WHERE type = 2`);
};
