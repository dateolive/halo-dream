<?php
$array = array();
$status = 200;
$message = "获取数据成功";
function friendsdata($sql)
{
    $datas=array();
    include_once "mysql.php";
    $sqldata = mysqli_query($link, $sql);
    while ($obj = mysqli_fetch_object($sqldata)) {
        $datas[] = $obj;
    }
    mysqli_close($link);
    return $datas;
}
