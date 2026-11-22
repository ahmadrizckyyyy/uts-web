<?php
require_once "../koneksi/connection.php";

$raw_input = json_decode(file_get_contents("php://input"), true);
$id = $_POST["id"] ?? $_GET["id"] ?? ($raw_input["id"] ?? "");

if (empty($id)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Parameter id wajib diisi"
    ]);
    exit;
}

try {
    $sql = "DELETE FROM tournaments WHERE id = ?";
    $stmt = $database_connection->prepare($sql);
    $stmt->execute([(int) $id]);

    echo json_encode([
        "success" => true,
        "message" => "Data deleted successfully!"
    ]);
} catch (PDOException $err) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error deleting data: " . $err->getMessage()
    ]);
}