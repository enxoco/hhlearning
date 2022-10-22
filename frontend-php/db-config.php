<?php
    require_once(__DIR__ . '/DotEnv.php');
    Use EnxoCo\DotEnv;
    (new DotEnv(__DIR__ . '/.env'))->load();

    try {
        $db_con = new PDO("pgsql:host=" . getenv('DATABASE_HOST') . ";port=5432;dbname=" . getenv('DATABASE_NAME') ."", getenv('DATABASE_USER'), getenv('DATABASE_PASSWORD'));
        $db_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
        echo $e->getMessage();
    }

?>