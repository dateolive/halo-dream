<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
include_once "util.php";
@$dataSize=10;
@$index = empty($_GET["index"]) ? 1 : $_GET["index"];
@$allcount=GetCount();
if(@$allcount>=ceil($dataSize*$index)){
$sql = "select * from  obj_message  ORDER by time desc limit " . (($index - 1) * $dataSize) . "," . $dataSize;
@$array = liuyan($sql);
if (!empty($array)) {
    $result = array(
        "status" => $status,
        "msg" => $message,
        "data" => $array,
    );
} else {
    $result = array(
        "status" => '201',
        "msg" => '获取数据失败，请联系管理员',
        "data" => "null"
    );
}
}else{
       $result = array(
        "status" => '203',
        "msg" => '数据已满',
        "data" => $allcount
    );
}

echo json_encode($result, JSON_UNESCAPED_UNICODE);