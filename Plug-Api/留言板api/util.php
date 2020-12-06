<?php
$array = array();
$status = 200;
$message = "获取数据成功";
function liuyan($sql)
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
function GetCount(){
     $coon = mysqli_connect("localhost", "liuyan", "你的密码");
     mysqli_select_db($coon, "liuyan");
     mysqli_set_charset($coon, "utf8mb4");
     $rs = "select count(*) num from obj_message"; 
     $r = mysqli_query($coon, $rs);
     $obj = mysqli_fetch_object($r);
     mysqli_close($coon, "liuyan");
     return $obj->num;
}
function send($sql){
     $coon = mysqli_connect("localhost", "liuyan", "你的密码");
     mysqli_select_db($coon, "liuyan");
     mysqli_set_charset($coon, "utf8mb4");
     $r = mysqli_query($coon, $sql);
     if($r){
         return true;
     }else{
         return false;
     }
    mysqli_close($coon, "liuyan");
}
 function avoidhit($str){
        //$str = trim($str);  //清理空格  
        //$str = strip_tags($str);   //过滤html标签  
          //将字符内容转化为html实体  
        $str = addslashes($str);  //防止SQL注入
        return $str;
}