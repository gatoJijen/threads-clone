// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const user = auth.currentUser
export { auth, provider, signInWithPopup,db, user};