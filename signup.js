// Fixora Account Registration

const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("fullName");
const emailInput = document.getElementById("signupEmail");
const passwordInput = document.getElementById("signupPassword");
const confirmInput = document.getElementById("confirmPassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const signupMessage = document.getElementById("signupMessage");

function getUsers() {
    try {
        const users = JSON.parse(
            localStorage.getItem("fixoraUsers") || "[]"
        );

        return Array.isArray(users) ? users : [];
    } catch {
        return [];
    }
}

signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmError.textContent = "";
    signupMessage.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmPassword = confirmInput.value;

    let hasError = false;

    if (name.length < 2) {
        nameError.textContent = "Please enter your full name.";
        hasError = true;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        hasError = true;
    }

    if (password.length < 8) {
        passwordError.textContent =
            "Password must contain at least 8 characters.";
        hasError = true;
    }

    if (password !== confirmPassword) {
        confirmError.textContent = "Passwords do not match.";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const users = getUsers();

    // Reserve the assignment's administrator account.
    if (email === "admin@gmail.com") {
        signupMessage.textContent =
            "This email is reserved for the administrator.";
        return;
    }

    // Prevent duplicate accounts.
    const accountExists = users.some(
        user => user.email.toLowerCase() === email
    );

    if (accountExists) {
        signupMessage.textContent =
            "An account with this email already exists.";
        return;
    }

    // Save the new account in browser storage.
    users.push({
        name: name,
        email: email,
        password: password
    });

    try {
        localStorage.setItem("fixoraUsers", JSON.stringify(users));
    } catch {
        signupMessage.textContent =
            "Unable to save the account. Check your browser storage.";
        return;
    }

    signupMessage.style.color = "#168b5d";
    signupMessage.textContent =
        "Account created successfully! Redirecting to login...";

    signupForm.reset();

    setTimeout(function () {
        window.location.replace("index.html");
    }, 1200);
});