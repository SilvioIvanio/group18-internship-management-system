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
