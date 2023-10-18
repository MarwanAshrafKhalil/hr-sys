// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FITEBASE_API_KEY,
  authDomain: "hr-auth-31a6a.firebaseapp.com",
  projectId: "hr-auth-31a6a",
  storageBucket: "hr-auth-31a6a.appspot.com",
  messagingSenderId: "40540223156",
  appId: "1:40540223156:web:3569b690b0156597ec09e1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
