<?php
require_once "../koneksi/connection.php";

$id = $_POST["id"] ?? "";
$title = $_POST["title"] ?? "";
$category = $_POST["category"] ?? "";
$event_date = $_POST["event_date"] ?? "";
$location = $_POST["location"] ?? "";
$prize = $_POST["prize"] ?? "";
$contact_name = $_POST["contact_name"] ?? "Panitia Nexus Arena";
$contact_role = $_POST["contact_role"] ?? "Admin Informasi";
$contact_phone = $_POST["contact_phone"] ?? "-";
$summary = $_POST["summary"] ?? "";
$content = $_POST["content"] ?? "";

$photo_path = $_POST["photo"] ?? "";
if (!empty($_FILES["filePhoto"]["name"])) {
    $upload_dir = __DIR__ . "/../photo/";
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    $photo_name = basename($_FILES["filePhoto"]["name"]);
    $photo_tmp = $_FILES["filePhoto"]["tmp_name"];
    if (move_uploaded_file($photo_tmp, $upload_dir . $photo_name)) {
        $photo_path = "photo/" . $photo_name;
    }
}

try {
    if (!empty($id)) {
        $sql = "UPDATE tournaments SET
                    title = ?,
                    category = ?,
                    event_date = ?,
                    location = ?,
                    prize = ?,
                    contact_name = ?,
                    contact_role = ?,
                    contact_phone = ?,
                    summary = ?,
                    content = ?,
                    photo = ?
                WHERE id = ?";
        $stmt = $database_connection->prepare($sql);
        $stmt->execute([
            $title,
            $category,
            $event_date,
            $location,
            $prize,
            $contact_name,
            $contact_role,
            $contact_phone,
            $summary,
            $content,
            $photo_path,
            (int) $id
        ]);
        echo json_encode([
            "success" => true,
            "message" => "Data updated successfully!"
        ]);
    } else {
        $sql = "INSERT INTO tournaments
                    (title, category, event_date, location, prize, contact_name, contact_role, contact_phone, summary, content, photo)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $database_connection->prepare($sql);
        $stmt->execute([
            $title,
            $category,
            $event_date,
            $location,
            $prize,
            $contact_name,
            $contact_role,
            $contact_phone,
            $summary,
            $content,
            $photo_path
        ]);
        http_response_code(201);
        echo json_encode([
            "success" => true,
            "message" => "Data inserted successfully!"
        ]);
    }
} catch (PDOException $err) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Error saving data: " . $err->getMessage()
    ]);
}