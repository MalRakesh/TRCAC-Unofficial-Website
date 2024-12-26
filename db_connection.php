<?php
// Database configuration
$servername = "sql206.infinityfree.com"; // usually "localhost"
$username = "if0_37755554"; // your database username
$password = "RakeshMal@12345"; // your database password
$dbname = "if0_37755554_trcac"; // your database name

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Optionally, specify the character set
mysqli_set_charset($conn, "utf8");

// You can also use the following line for a more secure connection setup if you're using MySQLi in a more modern application
// if(!mysqli_set_charset($conn, "utf8mb4")) {
//     exit("Failed to set charset to utf8mb4");
// }
?>