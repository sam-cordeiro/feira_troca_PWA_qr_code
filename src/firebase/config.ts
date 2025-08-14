import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDTcGv-5vbqlcIJt2ofiyEAPM6ZH8CYw2U",
  authDomain: "feira-troca.firebaseapp.com",
  projectId: "feira-troca",
  storageBucket: "feira-troca.firebasestorage.app",
  messagingSenderId: "10254286820",
  appId: "1:10254286820:web:98227e85d79cfe33fd11f1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);