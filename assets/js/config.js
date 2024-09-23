import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
  remove,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCkFm3g71gbxaJCzKkqjzdQK0YGSSPxfeQ",
  authDomain: "new-blog-app-24aa1.firebaseapp.com",
  databaseURL: "https://new-blog-app-24aa1-default-rtdb.firebaseio.com/", // Ensure this is correct
  projectId: "new-blog-app-24aa1",
  storageBucket: "new-blog-app-24aa1.appspot.com",
  messagingSenderId: "409846406942",
  appId: "1:409846406942:web:973c0eac2dc04d3cb4730f",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const realdb = getDatabase(app);
// console.firebase.google.com/project/new-blog-app-24aa1/database/new-blog-app-24aa1-default-rtdb/data/~2F
export {
  storage,
  realdb,
  sRef,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  set,
  get,
  child,
  signInWithEmailAndPassword,
  remove,
};
