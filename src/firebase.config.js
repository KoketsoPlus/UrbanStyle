// src/firebase.config.js

// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbqEci4qrotXeAC6l0pETEu2OZDbnyOJk",
  authDomain: "urban-style-cec96.firebaseapp.com",
  projectId: "urban-style-cec96",
  storageBucket: "urban-style-cec96.firebasestorage.app",
  messagingSenderId: "963846438761",
  appId: "1:963846438761:web:66c3b65baeec63848d47f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth, firestore, and storage instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
