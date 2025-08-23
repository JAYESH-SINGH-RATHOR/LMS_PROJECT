// Import Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY, // Make sure this is in your .env file
  authDomain: "login-fe006.firebaseapp.com",
  projectId: "login-fe006",
  storageBucket: "login-fe006.appspot.com",
  messagingSenderId: "556475243824",
  appId: "1:556475243824:web:dcdcc72022828675ed7cf5",
  measurementId: "G-JNZQXLYQ6L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
