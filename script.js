// Login Form Submission Logic
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const validUsername = "petugang";
    const validPassword = "petu";

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        alert("Welcome, " + username + "!");
        window.location.href = "welcome.html"; // Redirect on success
    } else {
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = "Invalid username or password. Please try again.";
    }
});

// Theme Toggle Logic
function switchTheme() {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle.checked) {
        body.classList.add("dark-theme");
        body.classList.remove("light-theme");
    } else {
        body.classList.add("light-theme");
        body.classList.remove("dark-theme");
    }
}

// Initialize theme toggle state
window.onload = function () {
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.checked = document.body.classList.contains("dark-theme");
};
