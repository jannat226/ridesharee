import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLV_fek7eWA6Cc-q-_Ur7tmwjHyQ-XtMc",
  authDomain: "rideshare-14717.firebaseapp.com",
  projectId: "rideshare-14717",
  storageBucket: "rideshare-14717.appspot.com",
  messagingSenderId: "19753802509",
  appId: "1:19753802509:web:4e9d89fdb1acf2df40ae44",
  measurementId: "G-6B071RM1KD",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// const auth = get
export { db, auth };
