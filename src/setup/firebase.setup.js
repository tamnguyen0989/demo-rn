import { initializeApp } from 'firebase/app';

export const EMAIL = 'test@titandms.com.au';
export const PASS = '123456';

const firebaseConfig = {
  apiKey: 'AIzaSyBmMiwcU5LBEVMZIG8QvE2vrXlx4WAKvp8',
  authDomain: 'mealstogo-462e5.firebaseapp.com',
  projectId: 'mealstogo-462e5',
  storageBucket: 'mealstogo-462e5.appspot.com',
  messagingSenderId: '56225294385',
  appId: '1:56225294385:web:d35a3a65795b3fc982cd10',
};

export const app = initializeApp(firebaseConfig);
