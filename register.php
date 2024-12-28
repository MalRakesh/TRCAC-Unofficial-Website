<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errorMessages = [];

    // Collect and sanitize input data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $classValue = mysqli_real_escape_string($conn, $_POST['class']);
    $age = (int)$_POST['age'];  // ensure it's an integer
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $nationality = mysqli_real_escape_string($conn, $_POST['nationality']);
    $contactNumber = mysqli_real_escape_string($conn, $_POST['contact-number']);
    $password = mysqli_real_escape_string($conn, $_POST['password']); // Raw password for hashing

    // Validate input fields for completeness
    if (empty($name) || empty($classValue) || empty($email) || empty($password)) {
        $errorMessages[] = "Please fill in all required fields.";
    }

    // Check for existing email
    $emailCheckQuery = "SELECT * FROM students WHERE email='$email'";
    $result = mysqli_query($conn, $emailCheckQuery);
    if ($result && mysqli_num_rows($result) > 0) {
        $errorMessages[] = "Error: Email already exists. Please choose another email.";
    }

    // Register if no errors
    if (empty($errorMessages)) {
        // Hash the password before storing
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $query = "INSERT INTO students (name, class, age, gender, email, nationality, contact_number, password) VALUES ('$name', '$classValue', $age, '$gender', '$email', '$nationality', '$contactNumber', '$hashedPassword')";

        if (mysqli_query($conn, $query)) {
            echo "SUCCESS: User registered successfully!";
        } else {
            echo "ERROR: Error registering user. Error: " . mysqli_error($conn);
        }
    } else {
        echo "ERROR: " . implode(" ", $errorMessages);
    }

    mysqli_close($conn);
    exit; // Prevent any further output
}
?>