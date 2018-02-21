<?php
try {
    $conn = new PDO("mysql:host=localhost;dbname=shopping_list", 'root', 'root');
    $stmt = $conn->prepare("SELECT * FROM items");
    $stmt->execute();

    // var_dump( $stmt->fetchAll());
    sleep(10);
    echo  json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
  } catch (PDOException $e) {
    echo 'eroare';
  }