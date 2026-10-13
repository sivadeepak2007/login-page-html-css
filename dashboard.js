// Fixora Dashboard

const logoutButton = document.getElementById("logoutButton");
const welcomeMessage = document.getElementById("welcomeMessage");
const currentDate = document.getElementById("currentDate");

const userName =
    sessionStorage.getItem("fixoraName") ||
    localStorage.getItem("fixoraName") ||
    "Admin";

// Display the logged-in user's name.
welcomeMessage.textContent = `Welcome, ${userName}!`;

// Display today's date.
currentDate.textContent = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
});

// Log out.
logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem("fixoraLoggedIn");
    sessionStorage.removeItem("fixoraEmail");
    sessionStorage.removeItem("fixoraName");

    localStorage.removeItem("fixoraLoggedIn");
    localStorage.removeItem("fixoraEmail");
    localStorage.removeItem("fixoraName");

    window.location.replace("index.html");
});