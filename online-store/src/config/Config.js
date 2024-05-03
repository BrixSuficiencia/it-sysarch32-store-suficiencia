// Import Firebase modules individually
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXRmhWTyBlxk9PLid-D5qxWEM5PFGpbvE",
  authDomain: "it-sysarch32-store-suficiencia.firebaseapp.com",
  projectId: "it-sysarch32-store-suficiencia",
  storageBucket: "it-sysarch32-store-suficiencia.appspot.com",
  messagingSenderId: "578079282158",
  appId: "1:578079282158:web:6e1628ff236e299418f4ff",
  measurementId: "G-1FH7P4Y9BP"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Export Firebase services
export { auth, db, storage };
