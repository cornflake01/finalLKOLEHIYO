import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  onValue,
  set,
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
const gradesRef = ref(db, "grades");

const gradesTableEl = document.getElementById("grades-table");
const uploadbtn = document.getElementById("upload-btn");

uploadbtn.onclick = () => {
  uploadGrades();
};

window.onload = () => {
  onValue(gradesRef, (snapshot) => {
    renderGrades(snapshot);
  });
};

function uploadGrades() {
  let reader = new FileReader();
  let picker = document.getElementById("picker");

  gradesTableEl.querySelector("tbody").innerHTML = "";

  const file = picker.files[0];
  if (file) {
    reader.readAsText(file);
  }

  reader.onload = () => {
    let csv = reader.result;

    let rows = csv.split("\r\n");
    rows.shift();

    for (let row of rows) {
      let cols = row.match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g);

      if (cols != null) {
        const studentGrade = cols.map((col) => col.replace(/(^"|"$)/g, ""));

        set(ref(db, "grades/" + studentGrade[0]), {
          lrn: studentGrade[0],
          student: studentGrade[1],
          midtermGrade: studentGrade[2],
          finalGrade: studentGrade[3],
        })
          .then(() => {
            console.log("Grades uploaded successfully.");
          })
          .catch((error) => {
            console.error("Error uploading grades: ", error);
          });
      }
    }
  };
}

function renderGrades(gradesInfo) {
  gradesTableEl.querySelector("tbody").innerHTML = "";

  gradesInfo.forEach((gradeInfo) => {
    const grade = gradeInfo.val();

    if (typeof grade === "object") {
      let tr = gradesTableEl.querySelector("tbody").insertRow();
      tr.innerHTML = `
        <th scope="row">${grade.lrn}</th>
        <td>${grade.student}</td>
        <td>${grade.midtermGrade}</td>
        <td>${grade.finalGrade}</td>
      `;
    }
  });
}
