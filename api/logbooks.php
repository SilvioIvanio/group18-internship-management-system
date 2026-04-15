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
