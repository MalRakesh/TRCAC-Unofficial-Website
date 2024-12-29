const registrationForm = document.getElementById("registration-form");
const loginForm = document.getElementById("login-form");

function showFeedback(element, message) {
  element.innerHTML = `<span class='error'>${message}</span>`;
}

function handleFormSubmission(
  form,
  url,
  feedbackDiv,
  successMessage,
  redirectUrl
) {
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
        alert(successMessage);
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      } else {
        const errorMessage = data.replace("ERROR: ", "").trim();
        alert(errorMessage);
        showFeedback(feedbackDiv, errorMessage);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred: " + error.message);
      showFeedback(feedbackDiv, "An error occurred: " + error.message);
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
    "You have successfully registered! Now you can log in.",
    "login.php"
  );
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const feedbackDiv = document.getElementById("login-feedback");
  handleFormSubmission(
    loginForm,
    "login.php",
    feedbackDiv,
    "You have successfully logged in!",
    "Welcome.html"
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
