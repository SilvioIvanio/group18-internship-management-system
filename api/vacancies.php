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
