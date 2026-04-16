<?php
header("Content-Type: application/json");
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $placement_id = $_GET['placement_id'] ?? null;
        $student_id = $_GET['student_id'] ?? null;
        
        if ($placement_id) {
            $stmt = $conn->prepare("SELECT * FROM logbooks WHERE placement_id = ? ORDER BY id DESC");
            $stmt->bind_param("i", $placement_id);
        } else if ($student_id) {
            // Get all logbooks for student's placements
            $stmt = $conn->prepare("SELECT l.* FROM logbooks l JOIN placements p ON l.placement_id = p.id WHERE p.student_id = ? ORDER BY l.id DESC");
            $stmt->bind_param("i", $student_id);
        } else {
            // Lecturer view - get all logbooks
            $stmt = $conn->prepare("SELECT l.*, s.name as student_name FROM logbooks l JOIN placements p ON l.placement_id = p.id JOIN users s ON p.student_id = s.id ORDER BY l.id DESC");
        }
        
        $stmt->execute();
        $result = $stmt->get_result();
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $data]);
        break;

    case 'POST':
        $placement_id = $_POST['placement_id'] ?? 0;
        $week = $_POST['week_title'] ?? '';
        $dates = $_POST['dates'] ?? '';
        $body = $_POST['body'] ?? '';
        $hours = (int)($_POST['hours'] ?? 0);
        
        $stmt = $conn->prepare("INSERT INTO logbooks (placement_id, week_title, dates, body, hours, status) VALUES (?, ?, ?, ?, ?, 'Pending')");
        $stmt->bind_param("isssi", $placement_id, $week, $dates, $body, $hours);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Logbook entry submitted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to submit"]);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? 0;
        $status = $data['status'] ?? ''; // Approved, Rejected
        
        $stmt = $conn->prepare("UPDATE logbooks SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Logbook updated"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Update failed"]);
        }
        break;
}
?>
