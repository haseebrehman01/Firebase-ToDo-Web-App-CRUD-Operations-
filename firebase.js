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
    apiKey: "AIzaSyAlCt9QgdziE69kGc0IZnjDIqMpNvb_-OU",
    authDomain: "auth-practice-feb12.firebaseapp.com",
    projectId: "auth-practice-feb12",
    storageBucket: "auth-practice-feb12.appspot.com",
    messagingSenderId: "1019160864521",
    appId: "1:1019160864521:web:0213b8114d85409ecfd5d8"
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
