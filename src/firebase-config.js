 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import{getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBZ8EuT1aA66DLevP9jFaqYETGZUymClLQ",
  authDomain: "pharmacy-fc1e9.firebaseapp.com",
  projectId: "pharmacy-fc1e9",
  storageBucket: "pharmacy-fc1e9.appspot.com",
  messagingSenderId: "10785709389",
  appId: "1:10785709389:web:db307d6f4774874ee3eb04",
  measurementId: "G-4ZMSWLHVMQ"
};

const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const db= getFirestore(app)
