<script type="module">
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
    import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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
    const analytics = getAnalytics(app);
    const db = getDatabase(app);

    // Function to fetch and display events
    function displayEvents() {
        const eventBody = document.getElementById("eventBody");

        // Reference to the "events" node in the database
        const eventsRef = ref(db, "events");

        // Listen for changes to the data at this reference
        onValue(eventsRef, (snapshot) => {
            eventBody.innerHTML = ""; // Clear previous event list

            // Iterate through each child node (event) in the database
            snapshot.forEach((childSnapshot) => {
                const event = childSnapshot.val(); // Get the event data
                const tr = document.createElement("tr"); // Create a table row
                tr.innerHTML = `
                    <td>${event.title}</td>
                    <td>${event.date}</td>
                    <td>${event.description}</td>
                `; // Set the HTML content for the row
                eventBody.appendChild(tr); // Append the row to the table body
            });
        });
    }

    // Call the displayEvents function when the page loads
    displayEvents();
</script>
