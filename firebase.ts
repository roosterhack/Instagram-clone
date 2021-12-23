// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-TEEdFD8veGYKunhCISZptHffA3hLarE",
  authDomain: "edstagram-2ede3.firebaseapp.com",
  projectId: "edstagram-2ede3",
  storageBucket: "edstagram-2ede3.appspot.com",
  messagingSenderId: "726335434593",
  appId: "1:726335434593:web:59d3a413d3d7cbf1f99f20",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
