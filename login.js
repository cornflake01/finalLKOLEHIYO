const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Login successful, redirect to dashboard
            window.location.href = "studentdashboard.html";
        })
        .catch((error) => {
            // Handle login error
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorMessage);
            // Display error message to user
        });
});
