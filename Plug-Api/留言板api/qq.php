<?php 

$qq = $_GET['qq'];

$src = 'https://q1.qlogo.cn/g?b=qq&nk=' . $qq . '&s=100&t=' . time();  

header('Content-type: image/png');  

$res = imagecreatefromstring(file_get_contents($src)); 

imagepng($res); 

imagedestroy($res); 

?>