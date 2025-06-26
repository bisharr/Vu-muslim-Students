// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiNcmYHM1OlwrVo0qgvHEtmZ8xoh0muhw",
  authDomain: "muslim-students-vu.firebaseapp.com",
  projectId: "muslim-students-vu",
  storageBucket: "muslim-students-vu.firebasestorage.app",
  messagingSenderId: "220494913269",
  appId: "1:220494913269:web:a06a6e7c29716feb322fbc",
  measurementId: "G-2NWYWCKR3M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
