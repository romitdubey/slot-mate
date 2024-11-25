// Function to check if the user is authenticated by verifying JWT token
function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && token !== 'null' && token !== '';
}

// Function to decode and get user information from the token (using jwt-decode)
function getUserFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
        const decoded = jwt_decode(token); // Decode JWT token
        return decoded;
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
}

// Function to display user info on the dashboard
function displayUserInfo() {
    const user = getUserFromToken();
    if (user) {
        // If user is authenticated, display the username
        document.getElementById('welcomeMessage').textContent = `Welcome, ${user.username}`;
    } else {
        // Redirect to login if token is invalid or absent
        window.location.href = 'index.html';
    }
}

// Function to handle logout
function logout() {
    localStorage.removeItem('token'); // Remove the JWT token from local storage
    window.location.href = 'index.html'; // Redirect to login page
}

// Check if the user is authenticated when the page loads
displayUserInfo();

// Add logout functionality to the logout button
document.getElementById('logoutBtn').addEventListener('click', logout);
