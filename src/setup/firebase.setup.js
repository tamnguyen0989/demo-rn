import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

export const EMAIL = "test@titandms.com.au";
export const PASS = "123456";

const firebaseConfig = {
  apiKey: "AIzaSyBmMiwcU5LBEVMZIG8QvE2vrXlx4WAKvp8",
  authDomain: "mealstogo-462e5.firebaseapp.com",
  projectId: "mealstogo-462e5",
  storageBucket: "mealstogo-462e5.appspot.com",
  messagingSenderId: "56225294385",
  appId: "1:56225294385:web:d35a3a65795b3fc982cd10",
};

const app = initializeApp(firebaseConfig);
const auth =
  Platform.OS !== "web"
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      })
    : getAuth(app);

const db = getFirestore(app);

export { app, auth, getApp, getAuth, db };
