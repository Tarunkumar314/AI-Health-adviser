<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Display a thank you message
    echo "<h2>Thank You for Reaching Out to Us, $name!</h2>";
    echo "<p>We have received your message and will get back to you shortly.</p>";
} else {
    echo "Invalid request method.";
}
?>