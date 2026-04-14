<?php
header("Content-Type: application/json");
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

$user_id = $_POST['user_id'] ?? 0;
$type = $_POST['type'] ?? 'cv'; // 'cv' or 'transcript'

if (!isset($_FILES['document']) || $_FILES['document']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(["status" => "error", "message" => "File upload error"]);
    exit;
}

$file = $_FILES['document'];
$allowedTypes = ['application/pdf'];
if (!in_array($file['type'], $allowedTypes)) {
    echo json_encode(["status" => "error", "message" => "Only PDF files are allowed"]);
    exit;
}

if ($file['size'] > 5 * 1024 * 1024) { // 5MB limit
    echo json_encode(["status" => "error", "message" => "File is too large"]);
    exit;
}

// Generate unique filename to prevent clashes
$fileName = uniqid($type . "_") . "_" . basename($file['name']);
$uploadDir = '../uploads/documents/';
$destPath = $uploadDir . $fileName;

if (move_uploaded_file($file['tmp_name'], $destPath)) {
    // Update user profile
    $pathColumn = $type === 'cv' ? 'cv_path' : 'transcript_path';
    // Remove old file path logic could be here, but we will simply overwrite for now
    
    // Store relative path in db
    $dbPath = 'uploads/documents/' . $fileName;
    
    $stmt = $conn->prepare("UPDATE user_profiles SET $pathColumn = ? WHERE user_id = ?");
    $stmt->bind_param("si", $dbPath, $user_id);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "File uploaded successfully", "path" => $dbPath]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database update failed"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Failed to move uploaded file"]);
}
?>
