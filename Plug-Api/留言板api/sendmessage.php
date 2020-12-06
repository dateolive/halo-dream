<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
include_once "util.php";
@$token = empty($_GET["token"]) ? '' : $_GET["token"];
@$arr = empty($_GET["data"]) ? '' : $_GET["data"];
$arr=json_decode($arr,true);
if($token=='datealive'&&sizeof($arr)>0){
    $qqurl="https://imapi.datealive.top/liuyan/api/qq.php?qq=";
    if($arr['qq']!='')
    $qqurl.=$arr['qq'];
    else{
        $qqurl.='1';
    }
    $sql="insert into obj_message set name='".avoidhit($arr['name'])."',head_image='".avoidhit($qqurl)."',word='".avoidhit($arr['word'])."',time='".date("Y-m-d H-i-s")."',site='".avoidhit($arr['site'])."',email='".avoidhit($arr['email'])."'";
    $res=send($sql);
    
     $result = array(
        "status" => '200',
        "data"=>"评论成功",
        "msg" => $res
    );
    
}else{
       $result = array(
        "status" => '203',
        "data"=>$arr,
        "msg" => 'token认证失败或返回数据为空',
    );
}



echo json_encode($result, JSON_UNESCAPED_UNICODE);