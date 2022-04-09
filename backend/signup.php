<?php
    $json = $_POST["Json"];
    $fp = fopen("users.json", "w");
    fwrite($fp, json_encode($json));
    fclose($fp);
?>