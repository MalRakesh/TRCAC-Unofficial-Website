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

        if (!$result) {
            echo json_encode(["success" => false, "message" => "ERROR: " . mysqli_error($conn)]);
            exit;
        }

        if (mysqli_num_rows($result) > 0) {
            $userData = mysqli_fetch_assoc($result);
            if (password_verify($loginPassword, $userData['password'])) {
                $_SESSION['user_id'] = $userData['id'];
                $_SESSION['username'] = $userData['name'];
                echo json_encode(["success" => true, "message" => "You have successfully logged in!"]);
            } else {
                echo json_encode(["success" => false, "message" => "You have entered an incorrect password or email ID."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "You have entered an incorrect password or email ID."]);
        }
    }

    mysqli_close($conn);
    exit;
}
?>