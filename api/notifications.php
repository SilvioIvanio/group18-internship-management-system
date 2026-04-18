<?php
header("Content-Type: application/json");
require 'db.php';

$user_id = $_GET['user_id'] ?? null;
if ($user_id) {
    $stmt = $conn->prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $data = [];
    while($row = $result->fetch_assoc()) $data[] = $row;
    echo json_encode(["status" => "success", "data" => $data]);
} else {
    echo json_encode(["status" => "error", "message" => "Missing user_id"]);
}
?>
