import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  get,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkFm3g71gbxaJCzKkqjzdQK0YGSSPxfeQ",
  authDomain: "new-blog-app-24aa1.firebaseapp.com",
  projectId: "new-blog-app-24aa1",
  storageBucket: "new-blog-app-24aa1.appspot.com",
  messagingSenderId: "409846406942",
  appId: "1:409846406942:web:973c0eac2dc04d3cb4730f",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

let MainFrom = document.getElementById("MainForm");
let emailInput = document.getElementById("emailInput");
let passwordInput = document.getElementById("passwordInput");

let SignInUser = (evt) => {
  evt.preventDefault();
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
    .then((credentials) => {
      // console.log(credentials);
      get(child(dbref, "Blog Login/" + credentials.user.uid)).then(
        (snapshot) => {
          if (snapshot.exists) {
            sessionStorage.setItem(
              "user-info",
              JSON.stringify({
                // firstname: snapshot.val().firstname,
                //lastname: snapshot.val().lastname,
              })
            );

            sessionStorage.setItem(
              "user-creds",
              JSON.stringify(credentials.user)
            );
            window.location.href = "home.html";
          }
        }
      );
    })
    .catch((error) => {
      alert(error.message);
      console.log(error.code);
      console.log(error.message);
    });
};
MainFrom.addEventListener("submit", SignInUser);
