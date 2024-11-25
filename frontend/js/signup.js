document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const signupMessage = document.getElementById("signupMessage");
  
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
  
      if (password !== confirmPassword) {
        signupMessage.textContent = "Passwords do not match!";
        signupMessage.style.color = "red";
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          signupMessage.textContent = "Registration successful! Redirecting...";
          signupMessage.style.color = "green";
          setTimeout(() => {
            window.location.href = "index.html";
          }, 2000);
        } else {
          signupMessage.textContent = data.message || "Registration failed!";
          signupMessage.style.color = "red";
        }
      } catch (error) {
        signupMessage.textContent = "Error: Could not connect to server.";
        signupMessage.style.color = "red";
        console.error("Error:", error);
      }
    });
  });
  