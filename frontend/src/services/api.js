import axios from "axios";

// Get the CSRF token from cookies
const getCSRFToken = () => {
    const csrfToken = document.cookie
        .split("; ")
        .find(row => row.startsWith("csrftoken="))
        ?.split("=")[1];
    return csrfToken;
};

// Create an instance of axios with the CSRF token
const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCSRFToken(),  // Add CSRF token here
    },
});

export default api;