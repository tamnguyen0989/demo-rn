import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { createGuid } from '../utils/helper';

const storage = getStorage();
const imageRef = ref(storage, 'photos/taked.jpg');

export const uploadFileStorage = async (uri) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  await uploadBytes(imageRef, theBlob);
  const guid = createGuid();
  return `https://firebasestorage.googleapis.com/v0/b/mealstogo-462e5.appspot.com/o/photos%2Ftaked.jpg?alt=media&v=${guid}`;
};
