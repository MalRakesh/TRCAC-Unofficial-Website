const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

// Function to show feedback
function showFeedback(element, message, isSuccess) {
  element.innerHTML = `<span class='${
    isSuccess ? "success" : "error"
  }'>${message}</span>`;
}

// Handle form submission
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

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Response from server:", data); // Log the server response

      // Check for success or error
      if (data.startsWith("SUCCESS")) {
        showFeedback(feedbackDiv, successMessage, true);
        alert(successMessage); // Show alert for successful action
        onSuccess && onSuccess(); // Call onSuccess function if provided
      } else if (data.startsWith("ERROR")) {
        showFeedback(feedbackDiv, data.replace("ERROR: ", ""), false); // Remove "ERROR: " from message
        alert("Action Failed: " + data.replace("ERROR: ", "")); // Show alert for failed action
      } else {
        // In case of unexpected response
        showFeedback(feedbackDiv, "Unexpected response from server.", false);
        alert("Unexpected response from server.");
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
  e.preventDefault(); // Prevent form submission
  const feedbackDiv = document.getElementById("registration-feedback");

  console.log("Submitting registration form..."); // Log submission

  handleFormSubmission(
    registrationForm,
    "register.php",
    feedbackDiv,
    "Student registered successfully! Please login.",
    () => {
      console.log(
        "Registration successful, resetting form and switching to login."
      ); // Log success
      registrationForm.reset();
      toggleForms(); // Switch to login form after registration
    }
  );
});

// Handle login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission
  const feedbackDiv = document.getElementById("login-feedback");

  console.log("Submitting login form..."); // Log submission

  handleFormSubmission(
    loginForm,
    "login.php",
    feedbackDiv,
    "Student logged in successfully!",
    () => {
      console.log("Login successful, redirecting..."); // Log success
      setTimeout(() => {
        window.location.href = "Welcome.html"; // Redirect after a short delay
      }, 1000);
    }
  );
});

// Function to toggle the registration and login forms
function toggleForms() {
  const registrationContainer = document.getElementById(
    "registration-container"
  );
  const loginContainer = document.getElementById("login-container");

  registrationContainer.style.display =
    registrationContainer.style.display === "none" ? "block" : "none";
  loginContainer.style.display =
    loginContainer.style.display === "none" ? "block" : "none";
}
