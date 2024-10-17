// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1a72hnUsi1l1mI1izsiWZY85-CnGKO2E",
  authDomain: "fir-pr-2750a.firebaseapp.com",
  projectId: "fir-pr-2750a",
  storageBucket: "fir-pr-2750a.appspot.com",
  messagingSenderId: "804944781775",
  appId: "1:804944781775:web:b93f3e215f392495ac72ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Auth service
const db = getFirestore(app);

export { auth,db };