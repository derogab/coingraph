<?php
// This is the old PHP file for
// getting coin values from the database
// and returning is as JSON. Replaced by function
// in webserver.py

#Show Error
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
# Connect to database
define("DB_HOST", "localhost");
define("DB_NAME", "coingraphs");
define("DB_USER", "coingraphs");
define("DB_PASS", "CGpassword");
# Mysqli
$mysqli = mysqli_connect(DB_HOST,DB_NAME,DB_PASS,DB_NAME) or die("Error: Connection to database.");
#PDO
try {
  $pdo = new PDO('mysql:host='.DB_HOST.';dbname='.DB_NAME, DB_USER, DB_PASS);
} catch (PDOException $e) {
  echo 'Connection failed: ' . $e->getMessage();
}
$connection = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!isset($_GET['base']) || !isset($_GET['change'])) {
  print_r('Error #1');
  exit;
}

# Last 24 h
$h24 = time() - 3600;

# Find data
try {
    $stmt = $pdo->prepare("SELECT time, ".strtolower($_GET['change'])." AS price FROM ".strtolower($_GET['base'])." WHERE time > ".$h24." ORDER BY time ASC");
    $stmt->execute();

    // set the resulting array to associative
    $rows = $stmt->fetchAll();
}
catch(PDOException $e) {
  print_r('Error #2');
  exit;
}

$c=0;
foreach ($rows as $row) {
  $data[$c] = array('time' => $row['time'], 'price' => $row['price']);
  $c++;
}

$json = array(strtolower($_GET['base']) => $data);

print_r(json_encode($json));
exit;

?>
