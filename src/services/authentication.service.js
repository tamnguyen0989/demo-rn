import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../setup/firebase.setup';

export const loginRequest = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
