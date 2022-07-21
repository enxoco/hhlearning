<?php

try {
        $db_con = new PDO('pgsql:host=database;port=5432;dbname=hhportal', 'hilger', 'password');
        $db_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch(PDOException $e) {
        echo $e->getMessage();
}

?>