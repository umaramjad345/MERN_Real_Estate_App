// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: "real-estate-app-8a850.firebaseapp.com",
  projectId: "real-estate-app-8a850",
  storageBucket: "real-estate-app-8a850.appspot.com",
  messagingSenderId: "468519572016",
  appId: "1:468519572016:web:99b6833916a530947453f5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
