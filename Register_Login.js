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

  // Log the form data for debugging
  console.log("Form Data:", formData);

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Check if the response is valid
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Server Response:", data); // Log the server's response for debugging
      if (data.includes("SUCCESS")) {
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
      showFeedback(feedbackDiv, "An error occurred: " + error.message, false);
      alert("Error: An error occurred."); // Show alert for general error
    })
    .finally(() => {
      submitButton.disabled = false; // Enable button after response
    });
}

// Handle registration form submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission
  const feedbackDiv = document.getElementById("registration-feedback");
  handleFormSubmission(
    registrationForm,
    "register.php", // PHP script for registration
    feedbackDiv,
    "Student registered successfully! Please login.",
    () => {
      registrationForm.reset(); // Reset form after successful registration
      toggleForms(); // Switch to login form after registration
    }
  );
});

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission
  const feedbackDiv = document.getElementById("login-feedback");
  handleFormSubmission(
    loginForm,
    "login.php", // PHP script for login
    feedbackDiv,
    "Student login successfully!",
    () => {
      setTimeout(() => {
        window.location.href = "Welcome.html"; // Redirect after a short delay
      }, 1000);
    }
  );
});

// Function to toggle between registration and login forms
function toggleForms() {
  const registrationContainer = document.getElementById(
    "registration-container"
  );
  const loginContainer = document.getElementById("login-container");

  // Toggle visibility of the forms
  registrationContainer.style.display =
    registrationContainer.style.display === "none" ? "block" : "none";
  loginContainer.style.display =
    loginContainer.style.display === "none" ? "block" : "none";
}
