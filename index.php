<?php
// require "models/UserModel.php";

// require "helpers/Connection.php";
require 'helpers/DotEnv.php';
// require "helpers/Data.php";

// session_start();

// function whatIsHappening() {
//     echo '<h2>$_GET</h2>';
//     var_dump($_GET);
//     echo '<h2>$_POST</h2>';
//     var_dump($_POST);
//     echo '<h2>$_COOKIE</h2>';
//     var_dump($_COOKIE);
//     echo '<h2>$_SESSION</h2>';
//     var_dump($_SESSION);
// }

$env = new DotEnv(__DIR__ . '/.env');
$env -> load();

// $password = getenv('PASSWORD');
// $username = getenv('USERNAME');
// $database = getenv('DATABASE');
// $hostname = getenv('HOSTNAME');

// $conn = new Connection($hostname, $username, $password, $database);
// $data = new Data($conn);

// require "views/public.php";

require "controllers/UserController.php";

// $controller = new default();

// if (isset($_GET['user'])) {
//     $controller = new UserController($data);
// }

// $controller->render($_GET, $_POST);