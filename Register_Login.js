const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

function showFeedback(element, message, isSuccess) {
  element.innerHTML = `<span class='${
    isSuccess ? "success" : "error"
  }'>${message}</span>`;
}

function handleFormSubmission(form, url, feedbackDiv, successMessage) {
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
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.text();
    })
    .then((data) => {
      console.log("Response from server:", data);

      if (data.startsWith("SUCCESS")) {
        showFeedback(feedbackDiv, successMessage, true);
        alert(successMessage);
      } else if (data.startsWith("ERROR")) {
        const errorMessage = data.replace("ERROR: ", "").trim();
        showFeedback(feedbackDiv, errorMessage, false);
        alert("Error: " + errorMessage);
      } else {
        showFeedback(feedbackDiv, "Unexpected response from server.", false);
        alert("Unexpected response from server.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      showFeedback(feedbackDiv, "An error occurred: " + error.message, false);
      alert("Error: An error occurred.");
    })
    .finally(() => {
      submitButton.disabled = false;
    });
}

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackDiv = document.getElementById("registration-feedback");

  handleFormSubmission(
    registrationForm,
    "register.php",
    feedbackDiv,
    "Student registered successfully! Please login."
  );
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackDiv = document.getElementById("login-feedback");

  handleFormSubmission(
    loginForm,
    "login.php",
    feedbackDiv,
    "Student logged in successfully! Redirecting..."
  );
});

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
