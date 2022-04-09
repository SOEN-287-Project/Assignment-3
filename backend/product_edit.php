<?php
    $json = $_POST["Json"];
    $fp = fopen("product_info.json", "w");
    fwrite($fp, json_encode($json));
    fclose($fp);
?>