/*TMODJS:{"version":9,"md5":"5e4c1aedc4f31f34818fa91e4b72069b"}*/
template('T-Advance-Content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,cellContentTxt=$data.cellContentTxt,$string=$utils.$string,cellContentImg=$data.cellContentImg,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="cell-content-child"> <div class="col-md-11 reset-margin-padding"> <div class="cell-content-txt"> <textarea class="form-control text_val" rows="6" placeholder="内容">';
$out+=$escape(cellContentTxt);
$out+='</textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <input class="btn_change_pic btnChangePic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" value="图片"> <span class="cellImgList">';
$out+=$string(cellContentImg);
$out+='</span> </div> </div> <div class="col-md-1"> ';
include('./Struct-Cell-Content-Action');
$out+=' </div> </div>';
return new String($out);
});