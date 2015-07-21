<?php
/**
 * User: mo
 * Date: 2015-7-19
 * Time: 22:10
 * @description 用于测试上传图片
 */

define('UPLOAD_DIR', 'upload/');
$img = $_POST['img'];
$img = str_replace('data:image/jpg;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . uniqid() . '.jpg';
$success = file_put_contents($file, $data);

$returnData = array(
    'url' => $file
);

echo json_encode($returnData);