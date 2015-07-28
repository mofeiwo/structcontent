/*TMODJS:{"version":3,"md5":"6e363074c006bb5eb49923546346f7c7"}*/
template('T-Advance-Content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="cell-content-child"> <div class="col-md-11 reset-margin-padding"> <div class="cell-content-txt"> <textarea class="form-control text_val" rows="3" placeholder="内容"></textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <input class="btn_change_pic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" value="图片"> </div> </div> <div class="col-md-1"> ';
include('./Struct-Cell-Content-Action');
$out+=' </div> </div>';
return new String($out);
});