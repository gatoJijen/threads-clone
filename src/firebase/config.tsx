// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSPJMpVur2sy1767zUDwylLgyd3tnD7_M",
  authDomain: "threads-clone-d323a.firebaseapp.com",
  projectId: "threads-clone-d323a",
  storageBucket: "threads-clone-d323a.firebasestorage.app",
  messagingSenderId: "774595003617",
  appId: "1:774595003617:web:3b3b61b2b5b814a959e3a0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);