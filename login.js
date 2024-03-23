import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4SI2yXymjL4cwtVvKtCxGTQOeMvU968w",
  authDomain: "l-kolehiyo-capstone.firebaseapp.com",
  databaseURL: "https://l-kolehiyo-capstone-default-rtdb.firebaseio.com",
  projectId: "l-kolehiyo-capstone",
  storageBucket: "l-kolehiyo-capstone.appspot.com",
  messagingSenderId: "1032233320347",
  appId: "1:1032233320347:web:109c19d37aec6d0364eb3e",
  measurementId: "G-D5R84EF8KY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth();

// Reference to the students in the database
const studentsRef = ref(db, "students");

const loginForm = document.getElementById("loginForm");

// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   firebase

//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Login successful, redirect to dashboard
//       window.location.href = "studentdashboard.html";
//     })
//     .catch((error) => {
//       console.log(error);
//       // Handle login error
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.error(errorMessage);
//       // Display error message to user
//     });
// });

document.getElementById("login-btn").onclick = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login successful, redirect to dashboard
      window.location.href = "studentdashboard.html";
    })
    .catch((error) => {
      console.log(error);
      // Handle login error
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      // Display error message to user
    });
};
