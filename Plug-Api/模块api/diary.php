<?php
header("Access-Control-Allow-Origin: *");
include_once "util.php";

$sql = "select * from wp_posts where post_type = 'shuoshuo' ORDER BY post_date DESC";
@$array = friendsdata($sql);
if (!empty($array)) {
    $result = array(
        "status" => $status,
        "msg" => $message,
        "data" => $array
    );
} else {
    $result = array(
        "status" => '201',
        "msg" => '获取数据失败，请联系管理员',
        "data" => 'null'
    );
}
echo json_encode($result, JSON_UNESCAPED_UNICODE);