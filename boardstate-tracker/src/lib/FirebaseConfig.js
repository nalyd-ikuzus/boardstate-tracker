// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj_Dc3BE_5S97FVq2Q6Z81uhdy9c4Js6U",
  authDomain: "boardstate-47edc.firebaseapp.com",
  projectId: "boardstate-47edc",
  storageBucket: "boardstate-47edc.firebasestorage.app",
  messagingSenderId: "752075156616",
  appId: "1:752075156616:web:bf0b382a7e3740a638c33d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
