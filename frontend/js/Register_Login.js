const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

// Function to show feedback (success or error messages)
function showFeedback(element, message, isSuccess) {
  element.innerHTML = `<span class='${
    isSuccess ? "success" : "error"
  }'>${message}</span>`;
}

// Handle form submission (generic function for registration and login)
function handleFormSubmission(
  form,
  url,
  feedbackDiv,
  successMessage,
  onSuccess
) {
  const formData = new FormData(form);
  feedbackDiv.innerHTML = ""; // Clear previous feedback
  const submitButton = form.querySelector('input[type="submit"]');
  submitButton.disabled = true; // Disable to prevent multiple submissions

  // Send form data via fetch to the provided URL (register.php or login.php)
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log(data); // Debugging: Log the response from the server
      if (data.includes(successMessage)) {
        showFeedback(feedbackDiv, successMessage, true);
        alert(successMessage); // Show alert for successful action
        onSuccess && onSuccess(); // Call onSuccess function if provided
      } else {
        showFeedback(feedbackDiv, data, false); // Display error message
        alert("Action Failed: " + data); // Show alert for failed action
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showFeedback(feedbackDiv, "An error occurred.", false);
      alert("Error: An error occurred."); // Show alert for general error
    })
    .finally(() => {
      submitButton.disabled = false; // Enable button after response
    });
}

// Handle registration
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission
  const feedbackDiv = document.getElementById("registration-feedback");

  handleFormSubmission(
    registrationForm,
    "register.php", // URL for registration processing
    feedbackDiv,
    "Student registered successfully! Please login.",
    () => {
      registrationForm.reset(); // Reset the form after successful registration
      toggleForms(); // Switch to login form after registration
      alert("Registration successful! Please log in.");
      // Refresh and navigate to the login form (or login page)
      setTimeout(() => {
        window.location.href = "Register_Login.html"; // Redirect to login page
      }, 2000); // 2 seconds delay before redirecting
    }
  );
});

// Handle login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission
  const feedbackDiv = document.getElementById("login-feedback");

  handleFormSubmission(
    loginForm,
    "login.php", // URL for login processing
    feedbackDiv,
    "Student login successfully!", // Success message to check
    () => {
      // Redirect to Welcome.html after successful login
      setTimeout(() => {
        window.location.href = "Welcome.html"; // Redirect to welcome page
      }, 500); // 500ms delay to ensure alert is shown
    }
  );
});

// Function to toggle between the registration and login forms
function toggleForms() {
  const registrationContainer = document.getElementById(
    "registration-container"
  );
  const loginContainer = document.getElementById("login-container");

  // Toggle form visibility
  registrationContainer.style.display =
    registrationContainer.style.display === "none" ? "block" : "none";
  loginContainer.style.display =
    loginContainer.style.display === "none" ? "block" : "none";
}
