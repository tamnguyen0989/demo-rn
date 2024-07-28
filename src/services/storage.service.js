import { getStorage, ref, uploadBytes } from 'firebase/storage';

const storage = getStorage();
const imageRef = ref(storage, 'photos/taked.jpg');

export const uploadFileStorage = async (uri) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();
  return await uploadBytes(imageRef, theBlob);
};
