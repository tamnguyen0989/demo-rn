import { tbClicked } from "../constants/sqlite.constants";
import { clickedSto } from "../constants/storage.constant";
import { getWebSto, setWebSto } from "../utils/helper";

export const getClickedNumber = async (db) => {
  if (!db) return getWebSto(clickedSto);
  return await db.getAllAsync(`SELECT * FROM ${tbClicked}`);
};

export const updateClickedNumber = async (db, clicked) => {
  const { id, person, photo, scan, signature, vehicle } = clicked;
  if (!db) {
    const clickeds = [{ ...clicked }];
    setWebSto(clickedSto, clickeds);
    return;
  }
  await db.runAsync(
    `UPDATE ${tbClicked} SET person = ?, photo = ?, scan = ?, signature = ?, vehicle = ? WHERE id = ? `,
    [person, photo, scan, signature, vehicle, id]
  );
};
