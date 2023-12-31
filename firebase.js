import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  getDocs,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAPsLt_8xQMkCqvVwZT8TyZhYQfiTkLmNI",
  authDomain: "todo-app-with-firebase-57822.firebaseapp.com",
  projectId: "todo-app-with-firebase-57822",
  storageBucket: "todo-app-with-firebase-57822.appspot.com",
  messagingSenderId: "376629613133",
  appId: "1:376629613133:web:00ffbafc5f6dce2f9ac204",
  measurementId: "G-98HZ9PRRNF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  getDocs,
  deleteDoc,
  updateDoc,
};
