<?php
header("Content-Type: application/json");
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $placement_id = $_GET['placement_id'] ?? null;
        
        if ($placement_id) {
            $stmt = $conn->prepare("SELECT e.*, u.name as evaluator_name FROM evaluations e JOIN users u ON e.evaluator_id = u.id WHERE e.placement_id = ?");
            $stmt->bind_param("i", $placement_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(["status" => "success", "data" => $data]);
        } else {
            // Get all needed evaluations for dashboard
            $res = $conn->query("SELECT e.*, u.name as evaluator_name, s.name as student_name FROM evaluations e JOIN placements p ON e.placement_id = p.id JOIN users s ON p.student_id = s.id JOIN users u ON e.evaluator_id = u.id");
            $data = [];
            while ($row = $res->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode(["status" => "success", "data" => $data]);
        }
        break;

    case 'POST':
        $placement_id = $_POST['placement_id'] ?? 0;
        $evaluator_id = $_POST['evaluator_id'] ?? 0;
        $type = $_POST['type'] ?? 'Mid-term';
        $score = (int)($_POST['score'] ?? 0);
        $feedback = $_POST['feedback'] ?? '';
        
        $stmt = $conn->prepare("INSERT INTO evaluations (placement_id, evaluator_id, type, score, feedback) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iisis", $placement_id, $evaluator_id, $type, $score, $feedback);
        
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Evaluation submitted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to submit evaluation"]);
        }
        break;
}
?>
