// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase config
  apiKey: "AIzaSyCwdeJgbB7Jv10K-Xmf10CLEpo868mc7Ow",
  authDomain: "budget-management-app-6e111.firebaseapp.com",
  projectId: "budget-management-app-6e111",
  storageBucket: "budget-management-app-6e111.appspot.com",
  messagingSenderId: "733786971318",
  appId: "1:733786971318:web:6a58bc8bf4719d1b4a9a17",
  measurementId: "G-6YBWYTXTSY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };