import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { createGuid } from '../utils/helper';

const storage = getStorage();
const pathFile = 'photos/taked.jpg';
const imageRef = ref(storage, pathFile);

export const FILE_URL = `https://firebasestorage.googleapis.com/v0/b/mealstogo-462e5.appspot.com/o/photos%2Ftaked.jpg?alt=media`;

export const uploadFileStorage = async (uri) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  await uploadBytes(imageRef, theBlob);
  const guid = createGuid();
  return `https://firebasestorage.googleapis.com/v0/b/mealstogo-462e5.appspot.com/o/photos%2Ftaked.jpg?alt=media&v=${guid}`;
};

export const getFileStorage = async () => {
  try {
    return await getDownloadURL(ref(storage, pathFile));
  } catch (error) {
    return null;
  }
};
