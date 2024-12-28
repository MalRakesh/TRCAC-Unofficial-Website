<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include 'db_connection.php';

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errorMessages = [];

    $loginEmail = mysqli_real_escape_string($conn, $_POST['login-email']);
    $loginPassword = $_POST['login-password'];

    // Validate input
    if (empty($loginEmail) || empty($loginPassword)) {
        $errorMessages[] = "Both email and password fields are required.";
    }

    // Process login only if no validation errors
    if (empty($errorMessages)) {
        $query = "SELECT * FROM students WHERE email='$loginEmail'";
        $result = mysqli_query($conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            $userData = mysqli_fetch_assoc($result);
            if (password_verify($loginPassword, $userData['password'])) {
                $_SESSION['user_id'] = $userData['id'];
                echo "SUCCESS: User logged in successfully!";
            } else {
                echo "ERROR: Incorrect password. Please try again.";
            }
        } else {
            echo "ERROR: No user found with this email. Please register first.";
        }
    } else {
        // Join the error messages and output them as a single string
        echo "ERROR: " . implode(" ", $errorMessages);
    }

    mysqli_close($conn); // Close the database connection
    exit; // Prevent any further output
}
?>