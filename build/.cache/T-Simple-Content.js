/*TMODJS:{"version":12,"md5":"d1fd3710e6b170b89a054a5e3dd58282"}*/
template('T-Simple-Content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,cellContentTxt=$data.cellContentTxt,$string=$utils.$string,cellContentImg=$data.cellContentImg,$out='';$out+='<div class="cell-content-txt"> <textarea class="form-control text_val" rows="6" placeholder="内容">';
$out+=$escape(cellContentTxt);
$out+='</textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <button class="btn btn-default btn_change_pic glyphicon glyphicon-picture btnChangePic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" title="上传图片"></button> <span class="cellImgList">';
$out+=$string(cellContentImg);
$out+='</span> </div>';
return new String($out);
});