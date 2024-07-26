import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { CLICKED_DOC_ID, db } from "../setup/firebase.setup";

export const getClickedNumber = async () => {
  const result = [];
  const querySnapshot = await getDocs(collection(db, "clicked"));
  querySnapshot.forEach((doc) => {
    result.push(doc.data());
  });
  return result;
};

export const updateClickedNumber = async (clicked) => {
  const docRef = doc(db, "clicked", CLICKED_DOC_ID);
  const result = await setDoc(docRef, clicked);
  return !!result;
};
