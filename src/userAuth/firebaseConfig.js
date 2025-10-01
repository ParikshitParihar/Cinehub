// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD3qvi5re9D6cASc_wZWMrIcItwTkouWeE",
  authDomain: "cineverse-21bd1.firebaseapp.com",
  projectId: "cineverse-21bd1",
  storageBucket: "cineverse-21bd1.firebasestorage.app",
  messagingSenderId: "473389392392",
  appId: "1:473389392392:web:3d5cc7b95038fe1e8a67bd",
  measurementId: "G-W5Y0ZL9631"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);