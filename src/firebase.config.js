// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDCPZsa8Y6h0Vib5nRUdOFii6WWSKF17E",
  authDomain: "lost-n-found-tracking-system.firebaseapp.com",
  projectId: "lost-n-found-tracking-system",
  storageBucket: "lost-n-found-tracking-system.appspot.com",
  messagingSenderId: "329562097914",
  appId: "1:329562097914:web:a869f499c503492e7ee143",
  measurementId: "G-GW0V7HP0EQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
