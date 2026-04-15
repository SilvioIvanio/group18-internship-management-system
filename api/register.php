<?php
header("Content-Type: application/json");
require 'db.php';

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$role = $_POST['role'] ?? 'student';
$student_no = $_POST['student_no'] ?? null;
$programme = $_POST['programme'] ?? null;
$year_of_study = $_POST['year'] ?? null;

if (!$name || !$email || !$password) {
    echo json_encode(["status" => "error", "message" => "All fields required"]);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $hash, $role);

if ($stmt->execute()) {
    $user_id = $conn->insert_id;
    // Insert full profile
    $profile_stmt = $conn->prepare("INSERT INTO user_profiles (user_id, student_no, programme, year_of_study) VALUES (?, ?, ?, ?)");
    $profile_stmt->bind_param("isss", $user_id, $student_no, $programme, $year_of_study);
    $profile_stmt->execute();

    echo json_encode(["status" => "success", "message" => "Registration successful"]);
} else {
    echo json_encode(["status" => "error", "message" => "Email already exists"]);
}
?>
