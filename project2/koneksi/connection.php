<?php
header("Content-Type: application/json; charset=UTF-8");

if (file_exists(__DIR__ . "/cors.php")) {
    require_once __DIR__ . "/cors.php";
}

$database_hostname = "localhost";
$database_username = "root";
$database_password = "";
$database_name = "nexus_arena_db";
$database_port = "3306";

try {
    $dsn = "mysql:host={$database_hostname};port={$database_port};dbname={$database_name};charset=utf8mb4";
    $database_connection = new PDO(
        $dsn,
        $database_username,
        $database_password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    error_log("Database connection error: " . $e->getMessage());
    echo json_encode([
        "success" => false,
        "message" => "Koneksi Gagal. Periksa konfigurasi database."
    ]);
    exit;
}