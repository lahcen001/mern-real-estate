// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-568cc.firebaseapp.com",
  projectId: "real-estate-568cc",
  storageBucket: "real-estate-568cc.appspot.com",
  messagingSenderId: "503953226080",
  appId: "1:503953226080:web:dfd47a6779f0cb530c4605",
  measurementId: "G-3RQFLH4SVQ"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
