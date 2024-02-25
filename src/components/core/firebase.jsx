// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdfTz6iWFtDgzC-CX5wFyL_JXs7XPXGSM",
  authDomain: "pocketdex-28adb.firebaseapp.com",
  projectId: "pocketdex-28adb",
  storageBucket: "pocketdex-28adb.appspot.com",
  messagingSenderId: "913143724084",
  appId: "1:913143724084:web:da47bf26baae9beaa2f261",
  measurementId: "G-1MGFXSSC6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });