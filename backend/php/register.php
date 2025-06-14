<?php
include 'db_connection.php';
session_start();

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errorMessages = [];

    // Get form data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $class = mysqli_real_escape_string($conn, $_POST['class']);
    $age = $_POST['age'];
    $gender = $_POST['gender'];
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $nationality = mysqli_real_escape_string($conn, $_POST['nationality']);
    $contact_number = $_POST['contact-number'];
    $password = $_POST['password'];

    // Check if required fields are empty
    if (empty($name) || empty($class) || empty($age) || empty($gender) || empty($email) || empty($nationality) || empty($contact_number) || empty($password)) {
        $errorMessages[] = "All fields are required!";
    }

    if (empty($errorMessages)) {
        // Check if the email is already registered
        $query = "SELECT * FROM students WHERE email='$email'";
        $result = mysqli_query($conn, $query);

        if ($result && mysqli_num_rows($result) > 0) {
            echo "ERROR: This email is already registered.";
        } else {
            // Hash the password for security
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Insert the new user into the database
            $insertQuery = "INSERT INTO students (name, class, age, gender, email, nationality, contact_number, password) VALUES ('$name', '$class', '$age', '$gender', '$email', '$nationality', '$contact_number', '$hashedPassword')";

            if (mysqli_query($conn, $insertQuery)) {
                echo "SUCCESS: Student registered successfully! Please login.";
            } else {
                echo "ERROR: There was an issue with registration. Please try again later.";
            }
        }
    } else {
        foreach ($errorMessages as $message) {
            echo "ERROR: " . $message . "<br>";
        }
    }

    mysqli_close($conn);
}
?>
