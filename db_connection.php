<?php
// Database connection details
$servername = "sql206.infinityfree.com"; // Your host name
$username = "if0_37755554"; // Your database username
$password = "RajaBhai@12345"; // Your database password
$dbname = "if0_37755554_trcac"; // Your database name (please replace with your actual database name)

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Set the character set to utf8mb4
if (!mysqli_set_charset($conn, 'utf8mb4')) {
    echo "Error loading character set utf8mb4: " . mysqli_error($conn);
} else {
    // Optional: You can check if the charset is set correctly
    printf("Current character set: %s\n", mysqli_character_set_name($conn));
}

// Your future queries go here...

// Close connection (make sure to close the connection when you're done)
register_shutdown_function(function() use ($conn) {
    mysqli_close($conn);
});
?>