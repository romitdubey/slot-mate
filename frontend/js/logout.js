// Function to handle logout
function logout() {
    localStorage.removeItem('token'); // Remove the JWT token from local storage
    window.location.href = 'index.html'; // Redirect to login page
}

// Add logout functionality to the logout button
document.getElementById('logoutBtn').addEventListener('click', logout);
