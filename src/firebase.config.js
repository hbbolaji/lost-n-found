// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD317aX1jXHQhECKHvNVDOnRhNElbJWTrI",
  authDomain: "lost-n-found-tracking-sy-131b4.firebaseapp.com",
  projectId: "lost-n-found-tracking-sy-131b4",
  storageBucket: "lost-n-found-tracking-sy-131b4.appspot.com",
  messagingSenderId: "5352208081",
  appId: "1:5352208081:web:065f0b7296f38390f377f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
