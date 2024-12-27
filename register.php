<?php
include 'db_connection.php';

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errorMessages = [];

    // Collect and sanitize input data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $classValue = mysqli_real_escape_string($conn, $_POST['class']);
    $age = (int)$_POST['age'];
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $nationality = mysqli_real_escape_string($conn, $_POST['nationality']);
    $contactNumber = mysqli_real_escape_string($conn, $_POST['contact-number']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // Validate input fields for completeness
    if (empty($name) || empty($classValue) || empty($email) || empty($password)) {
        $errorMessages[] = "Please fill in all required fields.";
    }

    // Check for existing email
    $emailCheckQuery = "SELECT * FROM students WHERE email=?";
    $stmt = mysqli_prepare($conn, $emailCheckQuery);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if ($result && mysqli_num_rows($result) > 0) {
        $errorMessages[] = "Error: Email already exists. Please choose another email.";
    }

    // Register if no errors
    if (empty($errorMessages)) {
        $query = "INSERT INTO students (name, class, age, gender, email, nationality, contact_number, password) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssisisss", $name, $classValue, $age, $gender, $email, $nationality, $contactNumber, $password);
        
        if (mysqli_stmt_execute($stmt)) {
            echo "SUCCESS: Student registered successfully! Please login.";
        } else {
            echo "ERROR: Error registering student. Please try again later.";
        }
    }

    if (!empty($errorMessages)) {
        foreach ($errorMessages as $message) {
            echo "ERROR: " . $message . "<br>";
        }
    }

    mysqli_close($conn);
}
?>
