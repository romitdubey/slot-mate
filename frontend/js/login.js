document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");
  
    // Form submission handler
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          loginMessage.textContent = "Login successful!";
          loginMessage.style.color = "green";
          console.log("Token:", data.token);
          localStorage.setItem("token", data.token);
          window.location.href = "dashboard.html";
        } else {
          loginMessage.textContent = data.message || "Login failed!";
          loginMessage.style.color = "red";
        }
      } catch (error) {
        loginMessage.textContent = "Error: Could not connect to server.";
        loginMessage.style.color = "red";
        console.error("Error:", error);
      }
    });
  });
  