const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

function handleFormSubmission(form, url, feedbackDiv, redirectUrl) {
  const formData = new FormData(form);
  feedbackDiv.innerHTML = "";
  const submitButton = form.querySelector('input[type="submit"]');
  submitButton.disabled = true;

  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network response was not okay: " + response.statusText
        );
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      console.log("Response from server:", data);

      if (data.success) {
        alert(data.message); // Show success message

        if (redirectUrl) {
          // Redirect if URL is provided
          window.location.href = redirectUrl;
        }
      } else {
        // Show error message
        alert(data.message);
        feedbackDiv.innerHTML = `<span class='error'>${data.message}</span>`;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
      feedbackDiv.innerHTML = "An error occurred. Please try again.";
    })
    .finally(() => {
      submitButton.disabled = false;
    });
}

// Update the registration form submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackDiv = document.getElementById("registration-feedback");
  handleFormSubmission(
    registrationForm,
    "register.php",
    feedbackDiv,
    "login.php"
  );
});

// Update the login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackDiv = document.getElementById("login-feedback");
  handleFormSubmission(loginForm, "login.php", feedbackDiv, "Welcome.html");
});
