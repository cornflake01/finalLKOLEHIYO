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
const db = getDatabase(app);
const auth = getAuth();

// Reference to the students in the database
const gradesRef = ref(db, "grades");
const studentsRef = ref(db, "students");

const gradesTableEl = document.getElementById("grades-table");

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     onValue(
//       studentsRef,
//       (snapshot) => {
//         snapshot.forEach((childSnapshot) => {
//           if (childSnapshot.val().email === user.email) {
//             renderGrades(childSnapshot.val().lrn);
//           }
//         });
//       },
//       {
//         onlyOnce: true, // This ensures that the listener is only triggered once
//       }
//     );
//   } else {
//     console.log("User is logged out");
//   }
// });

onValue(studentsRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    if (childSnapshot.val().email === auth.currentUser.email) {
      renderGrades(childSnapshot.val().lrn);
    }
  });
});

function renderGrades(lrn) {
  onValue(gradesRef, (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().lrn === lrn) {
        const gradesInfo = childSnapshot.val();

        gradesTableEl.innerHTML = `
            <thead>
              <tr>
                <th scope="col">LRN</th>
                <th scope="col">Student name</th>
                <th scope="col">Midterm grade</th>
                <th scope="col">Final grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">${gradesInfo.lrn}</th>
                <td>${gradesInfo.student}</td>
                <td>${gradesInfo.midtermGrade}</td>
                <td>${gradesInfo.finalGrade}</td>
              </tr>
            </tbody>
          `;
      }
    });
  });
}
