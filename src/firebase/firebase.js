// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa-9C8lCj2GfTT4fWX2Qo0qKc30aEBwrI",
  authDomain: "simple-firebase-5a96e.firebaseapp.com",
  projectId: "simple-firebase-5a96e",
  storageBucket: "simple-firebase-5a96e.appspot.com",
  messagingSenderId: "812365422952",
  appId: "1:812365422952:web:fd71f99fc10be0b21f36dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app}