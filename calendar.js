// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4SI2yXymjL4cwtVvKtCxGTQOeMvU968w",
    authDomain: "l-kolehiyo-capstone.firebaseapp.com",
    databaseURL: "https://l-kolehiyo-capstone-default-rtdb.firebaseio.com",
    projectId: "l-kolehiyo-capstone",
    storageBucket: "l-kolehiyo-capstone.appspot.com",
    messagingSenderId: "1032233320347",
    appId: "1:1032233320347:web:109c19d37aec6d0364eb3e",
    measurementId: "G-D5R84EF8KY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to add an event to Realtime Database
function addEventToRealtimeDatabase(title, date, description) {
    const eventsRef = ref(db, 'events');
    const newEventRef = push(eventsRef);
    newEventRef.set({
        title: title,
        date: date,
        description: description
    }).then(() => {
        console.log("Event added with ID: ", newEventRef.key);
    }).catch((error) => {
        console.error("Error adding event: ", error);
    });
}

export { addEventToRealtimeDatabase };
