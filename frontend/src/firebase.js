// Import necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACn6Hsl8F5orv3WtZxVLrDmLEs_r7SG8I",
  authDomain: "live-quiz-platform-cba47.firebaseapp.com",
  projectId: "live-quiz-platform-cba47",
  storageBucket: "live-quiz-platform-cba47.firebasestorage.app",
  messagingSenderId: "440500999986",
  appId: "1:440500999986:web:f54ae82611378c0ef0a92b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Authentication functions
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};

const logOut = async () => {
  await signOut(auth);
};

export { signInWithGoogle, logOut };
