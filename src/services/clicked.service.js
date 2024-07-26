import { collection, getDocs } from "firebase/firestore";
import { db } from "../setup/firebase.setup";

export const getClickedNumber = async () => {
  const result = [];
  const querySnapshot = await getDocs(collection(db, "clicked"));
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });
  return result;
};
