// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxfE66tkMuc_vz5uCK5ZDSJiozIux4QEc",
  authDomain: "draftly-b1185.firebaseapp.com",
  projectId: "draftly-b1185",
  storageBucket: "draftly-b1185.firebasestorage.app",
  messagingSenderId: "561103422918",
  appId: "1:561103422918:web:effc1f4ae8c8e8fcce5ec7",
  measurementId: "G-58EY942B6H"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export default app
