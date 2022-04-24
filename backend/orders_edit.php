<?php
    $json = $_POST["Json"];
    $fp = fopen("orders.json", "w");
    fwrite($fp, json_encode($json));
    fclose($fp);

    echo json_encode($json);
?>