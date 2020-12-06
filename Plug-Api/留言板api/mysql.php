<?php
header("Access-Control-Allow-Origin: *");	//跨域问题

$host = 'localhost'; //主机地址
$database = 'liuyan';   //数据库名
$username = 'liuyan'; //数据库的用户名
$password = ''; //数据库的密码
/*
 连接数据库
 */
$link = mysqli_connect($host, $username, $password);    
if (!$link) {

    die("数据库连接失败");
}
mysqli_select_db($link, "liuyan");
mysqli_query($link,"set names 'utf8'");//编码转化
    
?>