// Import the functions you need from the SDKs you need

//Firebase -> continue with Google

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDDoxAfxdfbZUnqxUmbUzLPJJSkcTAJkfs",
  authDomain: "signuping-40a4c.firebaseapp.com",
  projectId: "signuping-40a4c",
  storageBucket: "signuping-40a4c.appspot.com",
  messagingSenderId: "752819845260",
  appId: "1:752819845260:web:b2d8974bbc12769d71a3a9",
  measurementId: "G-5LE449WJ9F",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const messaging = getMessaging(app);
export { auth, provider, analytics, messaging };

