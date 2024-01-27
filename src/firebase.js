// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABxYRU1ZPiH0yaNSAtZsauxu8eB3Av5wk",
  authDomain: "authentication-e8924.firebaseapp.com",
  projectId: "authentication-e8924",
  storageBucket: "authentication-e8924.appspot.com",
  messagingSenderId: "294229174472",
  appId: "1:294229174472:web:4342af597d78cf28da5dfd",
  measurementId: "G-YVS2570S48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
