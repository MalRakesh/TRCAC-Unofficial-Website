<?php
$servername = "your_server"; // Your database server
$username = "your_username"; // Your database username
$password = "your_password"; // Your database password
$dbname = "your_database"; // Your database name

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>