
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById('signupSubmit');
  const signupMessage = document.getElementById("signupMessage");
  const container = document.getElementById('container');
  signupForm.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username_r").value;
    const email = document.getElementById("email_r").value;
    const password = document.getElementById("password_r").value;
    const confirmPassword = document.getElementById("conf_password_r").value;

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
          container.classList.remove("active");
        }, 4000);
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
  