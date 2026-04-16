<?php
header("Content-Type: application/json");
require 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $student_id = $_GET['student_id'] ?? null;
        $employer_id = $_GET['employer_id'] ?? null;
        
        if ($student_id) {
            $stmt = $conn->prepare("SELECT a.*, v.title, u.name as employer_name FROM applications a JOIN vacancies v ON a.vacancy_id = v.id JOIN users u ON v.employer_id = u.id WHERE a.student_id = ? ORDER BY a.applied_at DESC");
            $stmt->bind_param("i", $student_id);
        } else if ($employer_id) {
            $stmt = $conn->prepare("SELECT a.*, v.title, s.name as student_name, p.programme, p.year_of_study FROM applications a JOIN vacancies v ON a.vacancy_id = v.id JOIN users s ON a.student_id = s.id LEFT JOIN user_profiles p ON s.id = p.user_id WHERE v.employer_id = ? ORDER BY a.applied_at DESC");
            $stmt->bind_param("i", $employer_id);
        } else {
            // CEU fetches all pending
            $stmt = $conn->prepare("SELECT a.*, v.title, s.name as student_name, e.name as employer_name FROM applications a JOIN vacancies v ON a.vacancy_id = v.id JOIN users s ON a.student_id = s.id JOIN users e ON v.employer_id = e.id ORDER BY a.applied_at DESC");
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
        $student_id = $_POST['student_id'] ?? 0;
        $vacancy_id = $_POST['vacancy_id'] ?? 0;
        
        // check exists
        $chk = $conn->prepare("SELECT id FROM applications WHERE student_id = ? AND vacancy_id = ?");
        $chk->bind_param("ii", $student_id, $vacancy_id);
        $chk->execute();
        if ($chk->get_result()->num_rows > 0) {
            echo json_encode(["status" => "error", "message" => "Already applied!"]);
            exit;
        }

        $stmt = $conn->prepare("INSERT INTO applications (student_id, vacancy_id, status) VALUES (?, ?, 'Pending')");
