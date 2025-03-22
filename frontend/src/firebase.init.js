// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDR-kph5UBjld3oHQ2OvS7Eg8kio6LDFwE",
  authDomain: "simple-firebase-38da8.firebaseapp.com",
  projectId: "simple-firebase-38da8",
  storageBucket: "simple-firebase-38da8.appspot.com",
  messagingSenderId: "529191096154",
  appId: "1:529191096154:web:93ccfd250c4915846c6d63",
  measurementId: "G-VHH064P8GN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth
const db = getFirestore(app); // Initialize Firestore

// Export app, auth, and db
export { app, auth, db };
export default app; // Optional: Export app as default
