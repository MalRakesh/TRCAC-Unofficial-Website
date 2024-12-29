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

// Set the character set to utf8mb4
if (!mysqli_set_charset($conn, 'utf8mb4')) {
    echo "Error loading character set utf8mb4: " . mysqli_error($conn);
}

// Close connection on script shutdown
register_shutdown_function(function() use ($conn) {
    mysqli_close($conn);
});
?>