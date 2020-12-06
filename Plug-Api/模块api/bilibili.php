<?php
header("content-type:text/html;charset=utf-8");
header("Access-Control-Allow-Origin:*");
error_reporting(0);
function curl_get_https($url,$cookie)
{
    $curl = curl_init(); // 启动一个CURL会话
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // TRUE 将curl_exec()获取的信息以字符串返回，而不是直接输出。
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // 跳过证书检查
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    //发送请求头
    "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.90 Safari/537.36",
    "Cookie:$cookie"
    
));
    $tmpInfo = curl_exec($curl); // 返回api的json对象
    curl_close($curl);
    return $tmpInfo; // 返回json对象
}
@$type = empty($_GET["type"]) ? 1 : $_GET["type"];
$url = "https://api.bilibili.com/x/space/bangumi/follow/list?type=$type&follow_status=0&pn=1&ps=15&vmid=100669401";//修改成你的uid
$cookie="你的b站cookie";
$result=json_decode(curl_get_https($url,$cookie),true);
echo json_encode($result, JSON_UNESCAPED_UNICODE);
