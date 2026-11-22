<?php
require_once "../koneksi/connection.php";

try {
    if (!empty($_GET["id"])) {
        $sql = "SELECT * FROM tournaments WHERE id = :id";
        $stmt = $database_connection->prepare($sql);
        $stmt->execute([":id" => (int) $_GET["id"]]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            http_response_code(404);
            echo json_encode([
                "success" => false,
                "message" => "Data tidak ditemukan"
            ]);
            exit;
        }

        echo json_encode($row);
        exit;
    }

    $sql = "SELECT * FROM tournaments ORDER BY id ASC";
    $stmt = $database_connection->prepare($sql);
    $stmt->execute();

    $data = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $data[] = $row;
    }

    echo json_encode($data);
} catch (PDOException $err) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Tidak dapat memuat data: " . $err->getMessage()
    ]);
}