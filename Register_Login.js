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
  e.preventDefault();
  const feedbackDiv = document.getElementById("registration-feedback");
  handleFormSubmission(
    registrationForm,
    "register.php",
    feedbackDiv,
    "Student registered successfully! Please login.",
    () => {
      registrationForm.reset();
      toggleForms(); // Switch to login form after registration
    }
  );
});

// Handle login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackDiv = document.getElementById("login-feedback");
  handleFormSubmission(
    loginForm,
    "login.php",
    feedbackDiv,
    "Student login successfully!", // Success message
    () => {
      // Redirect after successful login
      setTimeout(() => {
        window.location.href = "Welcome.html"; // Redirect to welcome page
      }, 500); // 500ms delay
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
