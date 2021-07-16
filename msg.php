<?php

session_start();

header('content-type:text/html;charset=utf-8');

// 链接数据库
@$mysqli = new Mysqli('106.55.58.121', 'root', 'wansichao9187', 'wsc');
if ($mysqli->connect_errno) exit("链接错误:".$mysqli->connect_error);
$mysqli->set_charset('utf8');

// 接收留言 三个必填参数
if ($_POST['name'] && $_POST['contact'] && $_POST['msg']) { 
	$name    = "'".$_POST['name']."'";          //姓名
	$contact = "'".$_POST['contact']."'";       //联系方式
	$msg     = "'".$_POST['msg']."'";           //留言内容
	$time    = time();                          //时间
	$ip      = "'".$_SERVER["REMOTE_ADDR"]."'"; //IP
	if ($_SERVER["REMOTE_ADDR"]==$_SESSION['ip'] && $_SESSION['expire_time']>time()) {
		// 防止频繁提交
		echo 500;
	} else {
		$_SESSION['ip'] = $_SERVER["REMOTE_ADDR"]; //提交ip
		$_SESSION['expire_time'] = time()+10;      //十秒之内拒绝提交
		$sql = "insert into wsc_message(name,contact,msg,time,ip) values($name,$contact,$msg,$time,$ip)";
		$res = $mysqli->query($sql);
		// 提交成功后发送短信提醒
		if ($res) {
			$count = $_POST['name'].'在wansichao.com中留言：'.$_POST['msg'].'； 他的联系方式：'.$_POST['contact'];
			getSend('15270818100', $count);
			echo 200;
		}
	}
} else {
	header("location:http://www.wansichao.com");
}

/**
 * 发送短信
 * @param  string   $mobile   手机号码
 * @param  string   $count    短信内容（包含签名不超过300字）
 * @param  string   $title    短信前面（默认为【江西百度】,不可修改）
 */
function getSend($mobile, $count='', $title='【江西百度】'){
	$url = 'http://sms-api.luosimao.com/v1/send.json';
	$key = 'api:key-deac6c6c90c92e161d0e54f8f9f5491b';
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0 );
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 8);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_HEADER, FALSE);
	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	curl_setopt($ch, CURLOPT_USERPWD, $key);
	curl_setopt($ch, CURLOPT_POST, TRUE);
	
	if ($mobile!='' && $count!='') {
		curl_setopt($ch, CURLOPT_POSTFIELDS, array('mobile'=>$mobile, 'message'=>$count.$title));
		curl_exec($ch);
		curl_close($ch);
	}
}
