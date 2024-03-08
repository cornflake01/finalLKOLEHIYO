document.addEventListener('DOMContentLoaded', function() {
    const ratings = document.querySelectorAll('.rating');
    const sendBtn = document.querySelector('#send');
    const panel = document.querySelector('#panel');

    let selectedRating = '';

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
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const database = firebaseApp.database();

    if (ratings) {
        ratings.forEach(button => {
            button.addEventListener('click', () => {
                selectedRating = button.value;
                removeActive();
                button.classList.add('active');
            });
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', (e) => {
            const name = document.querySelector('#name').value; // Get the value of the name input field
            const email = document.querySelector('#email').value; // Get the value of the email input field
            const description = document.querySelector('#message').value; // Get the value of the description textarea

            // Push data to Firebase
            const feedbackRef = database.ref('feedbacks').push();
            feedbackRef.set({
                name: name,
                email: email,
                rating: selectedRating,
                description: description,
                timestamp: firebase.database.ServerValue.TIMESTAMP // Add timestamp
            }).then(function () {
                panel.innerHTML = `
                Thank you!\n
                Name: ${name}\n
                Email: ${email}\n
                Feedback : ${selectedRating}\n
                Description: ${description}\n
                We'll use your feedback to improve our school system.`;
            }).catch(function (error) {
                console.error('Error submitting feedback:', error);
                panel.innerHTML = "An error occurred while submitting feedback. Please try again later.";
            });
        });
    }

    function removeActive() {
        ratings.forEach(button => {
            button.classList.remove('active');
        });
    }
});
