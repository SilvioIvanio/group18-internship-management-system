<?php
header("Content-Type: application/json");
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = $_GET['user_id'] ?? null;
    if (!$user_id) { echo json_encode(["status" => "error", "message" => "Missing user_id"]); exit; }
    $stmt = $conn->prepare("SELECT u.name, u.email, u.role, p.* FROM users u LEFT JOIN user_profiles p ON u.id = p.user_id WHERE u.id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->execute();
    $res = $stmt->get_result()->fetch_assoc();
    
    if (!$res) {
        echo json_encode(["status" => "error", "message" => "User not found"]);
        exit;
    }
    
    // Calculate dynamic profile completion %
    $comp = 0;
    if (!empty($res['name'])) $comp += 20;
    if (!empty($res['email'])) $comp += 20;
    if (!empty($res['phone'])) $comp += 20;
    if (!empty($res['student_no'])) $comp += 20;
    if (!empty($res['cv_path'])) $comp += 20;
    $res['completion'] = $comp;
    
    // Dynamic counts
    try {
        $app_stmt = $conn->prepare("SELECT COUNT(*) as c FROM applications WHERE student_id = ?");
        if ($app_stmt) {
            $app_stmt->bind_param("i", $user_id);
            $app_stmt->execute();
            $row = $app_stmt->get_result()->fetch_assoc();
            $res['count_apps'] = is_array($row) ? $row['c'] : 0;
        } else { $res['count_apps'] = 0; }
    } catch(Exception $e) { $res['count_apps'] = 0; }
    
    try {
        $log_stmt = $conn->prepare("SELECT COUNT(*) as c FROM logbooks WHERE placement_id IN (SELECT id FROM placements WHERE student_id = ?)");
        if ($log_stmt) {
            $log_stmt->bind_param("i", $user_id);
            $log_stmt->execute();
            $row = $log_stmt->get_result()->fetch_assoc();
            $res['count_logs'] = is_array($row) ? $row['c'] : 0;
        } else { $res['count_logs'] = 0; }
    } catch(Exception $e) { $res['count_logs'] = 0; }
    
    try {
        $eval_stmt = $conn->prepare("SELECT AVG(score) as s FROM evaluations WHERE placement_id IN (SELECT id FROM placements WHERE student_id = ?)");
        if ($eval_stmt) {
            $eval_stmt->bind_param("i", $user_id);
            $eval_stmt->execute();
            $eval_row = $eval_stmt->get_result()->fetch_assoc();
            $res['avg_score'] = (is_array($eval_row) && isset($eval_row['s']) && $eval_row['s'] !== null) ? round($eval_row['s']) : '--';
        } else { $res['avg_score'] = '--'; }
    } catch(Exception $e) { $res['avg_score'] = '--'; }
    
    // Basic WIL progress mock based on logbooks out of 14 weeks
    $res['wil_progress'] = min(100, round(($res['count_logs'] / 14) * 100));

    echo json_encode(["status" => "success", "data" => $res]);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['user_id'] ?? null;
    if (!$user_id) { echo json_encode(["status" => "error"]); exit; }
    
    $phone = $_POST['phone'] ?? null;
    $address = $_POST['address'] ?? null;
    
    $stmt = $conn->prepare("UPDATE user_profiles SET phone = ?, address = ? WHERE user_id = ?");
    $stmt->bind_param("ssi", $phone, $address, $user_id);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error"]);
    }
}
?>
