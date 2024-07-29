import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { CLICKED_DOC_ID, db } from "../setup/firebase.setup";
import { tbClicked } from "./constants";

// export const updateClickedNumber = async (clicked) => {
//   const docRef = doc(db, "clicked", CLICKED_DOC_ID);
//   const result = await setDoc(docRef, clicked);
//   return !!result;
// };

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
      onResolve(res.rows._array);
    });
  });
};
