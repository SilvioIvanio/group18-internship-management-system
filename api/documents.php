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
