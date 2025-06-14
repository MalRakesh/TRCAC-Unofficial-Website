<?php
// Include database connection
include 'db_connection.php';

// Start the session
session_start();

// Initialize error messages array
$errorMessages = [];

// Check if the form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate user input
    $loginEmail = mysqli_real_escape_string($conn, $_POST['login-email']);
    $loginPassword = $_POST['login-password'];

    // Check if the required fields are empty
    if (empty($loginEmail) || empty($loginPassword)) {
        $errorMessages[] = "Both email and password fields are required.";
    }

    // If no errors, proceed with login logic
    if (empty($errorMessages)) {
        // Check if the email exists in the database
        $query = "SELECT * FROM students WHERE email='$loginEmail'";
        $result = mysqli_query($conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            // Fetch user data from the database
            $userData = mysqli_fetch_assoc($result);

            // Verify if the password matches the hashed password stored in the database
            if (password_verify($loginPassword, $userData['password'])) {
                // Successful login, store user ID in session
                $_SESSION['user_id'] = $userData['id']; // Store user ID for session use
                $_SESSION['user_email'] = $userData['email']; // Optionally store email

                // Return success message
                echo "SUCCESS: Student login successfully!";
            } else {
                // Password mismatch
                echo "ERROR: Incorrect password. Please try again.";
            }
        } else {
            // Email not found
            echo "ERROR: No user found with this email. Please register first.";
        }
    } else {
        // Return any form validation errors
        foreach ($errorMessages as $message) {
            echo "ERROR: " . $message . "<br>";
        }
    }
    
    // Close the database connection
    mysqli_close($conn);
}
?>
