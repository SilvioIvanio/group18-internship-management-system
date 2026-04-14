<?php
header("Content-Type: application/json");
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $employer_id = $_GET['employer_id'] ?? null;
        if ($employer_id) {
            $stmt = $conn->prepare("SELECT * FROM vacancies WHERE employer_id = ? ORDER BY deadline DESC");
            $stmt->bind_param("i", $employer_id);
        } else {
            $stmt = $conn->prepare("SELECT v.*, u.name as employer_name FROM vacancies v JOIN users u ON v.employer_id = u.id ORDER BY v.deadline DESC");
        }
        $stmt->execute();
        $result = $stmt->get_result();
        $vacancies = [];
        while ($row = $result->fetch_assoc()) {
            $vacancies[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $vacancies]);
        break;

    case 'POST':
        $employer_id = $_POST['employer_id'] ?? 0;
        $title = $_POST['title'] ?? '';
        $department = $_POST['department'] ?? '';
        $location = $_POST['location'] ?? '';
        $duration = (int)($_POST['duration_months'] ?? 0);
        $deadline = $_POST['deadline'] ?? '';
        $slots = (int)($_POST['slots'] ?? 0);
        $sector = $_POST['sector'] ?? '';
        $desc = $_POST['description'] ?? '';
        $req = $_POST['requirements'] ?? '';
        $remuneration = $_POST['remuneration'] ?? '';

        $stmt = $conn->prepare("INSERT INTO vacancies (employer_id, title, department, location, duration_months, deadline, slots, sector, description, requirements, remuneration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("isssisissss", $employer_id, $title, $department, $location, $duration, $deadline, $slots, $sector, $desc, $req, $remuneration);
        
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Vacancy created"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to create vacancy"]);
        }
        break;

    case 'PUT':
        // Parse raw JSON since PHP doesn't populate $_POST for PUT forms normally
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? 0;
        $status = $data['status'] ?? 'Open';
        
        $stmt = $conn->prepare("UPDATE vacancies SET status = ? WHERE id = ?");
        $stmt->bind_param("si", $status, $id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Vacancy updated"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Update failed"]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? 0;
        $stmt = $conn->prepare("DELETE FROM vacancies WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Vacancy deleted"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Delete failed"]);
        }
        break;
}
?>