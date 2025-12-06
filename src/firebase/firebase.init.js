// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAab0tb1KFAlc-mTmyWZS5gsGjk33I2mjE",
  authDomain: "club-d8411.firebaseapp.com",
  projectId: "club-d8411",
  storageBucket: "club-d8411.firebasestorage.app",
  messagingSenderId: "1013488579578",
  appId: "1:1013488579578:web:3dbfc766561ff2f88faa43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);