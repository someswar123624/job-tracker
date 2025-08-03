
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCay1xwFkM70BIn-bLfKJtiVkYubzLYTA",
  authDomain: "job-tracker-89af9.firebaseapp.com",
  projectId: "job-tracker-89af9",
  storageBucket: "job-tracker-89af9.appspot.com",
  messagingSenderId: "567835292592",
  appId: "1:567835292592:web:72e295a9704c84e81edc75",
  measurementId: "G-KJBEPCRDYT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
