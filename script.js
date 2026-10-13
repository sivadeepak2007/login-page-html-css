// Fixora Login Authentication

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const loginMessage = document.getElementById("loginMessage");

const togglePassword = document.getElementById("togglePassword");

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Admin@123";

// Check whether the user is logged in.
function isLoggedIn() {
    return (
        sessionStorage.getItem("fixoraLoggedIn") === "true" ||
        localStorage.getItem("fixoraLoggedIn") === "true"
    );
}

// Redirect logged-in users to the dashboard.
if (isLoggedIn()) {
    window.location.replace("dashboard.html");
}

// Show or hide the password.
togglePassword.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";
    togglePassword.textContent = isHidden ? "Hide" : "Show";

    togglePassword.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password"
    );

    togglePassword.setAttribute("aria-pressed", String(isHidden));
});

// Clear email errors when the user types.
emailInput.addEventListener("input", function () {
    emailError.textContent = "";
    loginMessage.textContent = "";
    loginMessage.style.color = "#dc2626";
});

// Clear password errors when the user types.
passwordInput.addEventListener("input", function () {
    passwordError.textContent = "";
    loginMessage.textContent = "";
    loginMessage.style.color = "#dc2626";
});

// Handle login.
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    loginMessage.textContent = "";
    loginMessage.style.color = "#dc2626";

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let hasError = false;

    // Validate email.
    if (!email) {
        emailError.textContent = "Please enter your email address.";
        hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        hasError = true;
    }

    // Validate password.
    if (!password) {
        passwordError.textContent = "Please enter your password.";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    // Check credentials.
    // Check the administrator account first.
let authenticatedUser = null;

if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    authenticatedUser = {
        name: "Admin",
        email: ADMIN_EMAIL
    };
} else {
    // Check accounts created through the registration page.
    let users = [];

    try {
        users = JSON.parse(
            localStorage.getItem("fixoraUsers") || "[]"
        );
    } catch {
        users = [];
    }

    if (!Array.isArray(users)) {
        users = [];
    }

    authenticatedUser = users.find(function (user) {
        return (
            user.email.toLowerCase() === email.toLowerCase() &&
            user.password === password
        );
    });
}

if (!authenticatedUser) {
    loginMessage.textContent =
        "Invalid email or password. Please try again.";
    return;
}

    // Remove any previous login state.
    localStorage.removeItem("fixoraLoggedIn");
    localStorage.removeItem("fixoraEmail");

    sessionStorage.removeItem("fixoraLoggedIn");
    sessionStorage.removeItem("fixoraEmail");

    // Save the login state.
    const storage = rememberMe.checked
        ? localStorage
        : sessionStorage;

   storage.setItem("fixoraLoggedIn", "true");
storage.setItem("fixoraEmail", authenticatedUser.email);
storage.setItem("fixoraName", authenticatedUser.name);
    // Open the dashboard.
    window.location.replace("dashboard.html");
});

// Forgot Password link.
document.getElementById("forgotPassword").addEventListener(
    "click",
    function (event) {
        event.preventDefault();

        loginMessage.style.color = "#6558f5";
        loginMessage.textContent =
            "Password recovery is not configured in this demo.";
    }
);

// Create Account link.
document.getElementById("createAccount").addEventListener(
    "click",
    function (event) {
        event.preventDefault();

        loginMessage.style.color = "#6558f5";
        loginMessage.textContent =
            "Account registration is not available in this demo.";
    }
);
