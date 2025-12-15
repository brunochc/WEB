<?php
// Leer las variables de entorno del archivo .env
require_once __DIR__ . '/vendor/autoload.php'; // Si usas Composer

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Datos de conexión a la base de datos
$host = $_ENV['localhost'];
$port = $_ENV['3306'];
$dbname = $_ENV['libredte_db'];
$username = $_ENV['ulumber'];
$password = $_ENV['Bruno.libredte1'];

// Crear una conexión
try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Conexión exitosa a la base de datos!";
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
}
?>
