import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app as appFireBase } from '../setup/firebase.setup';

export const loginRequest = (email, password) => {
  const auth = getAuth(appFireBase);
  return signInWithEmailAndPassword(auth, email, password);
};
