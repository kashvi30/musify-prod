// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAbrPIpxSi9BxdbyptEUmn23vK9kkbKe68",
  authDomain: "musify-453e3.firebaseapp.com",
  projectId: "musify-453e3",
  storageBucket: "musify-453e3.appspot.com",
  messagingSenderId: "353102238949",
  appId: "1:353102238949:web:f4441896627821adf8700c",
  measurementId: "G-VTCVVSLZL3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);
