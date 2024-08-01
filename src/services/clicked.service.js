import { tbClicked } from "../constants/sqlite.constants";

export const getClickedNumber = async (db) => {
  return await db.getAllAsync(`SELECT * FROM ${tbClicked}`);
};

export const updateClickedNumber = async (db, clicked) => {
  const { id, person, photo, scan, signature, vehicle } = clicked;
  await db.runAsync(
    `UPDATE ${tbClicked} SET person = ?, photo = ?, scan = ?, signature = ?, vehicle = ? WHERE id = ? `,
    [person, photo, scan, signature, vehicle, id]
  );
};
