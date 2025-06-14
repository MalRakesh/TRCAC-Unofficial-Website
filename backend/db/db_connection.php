<?php
// Database connection details
$servername = "sql104.infinityfree.com"; // Your host name
$username = "if0_37993356"; // Your database username
$password = "trcac12123"; // Your database password
$dbname = "if0_37993356_trcac"; // Your database name

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set the character set to utf8mb4 for proper encoding
mysqli_set_charset($conn, "utf8mb4");
?>
