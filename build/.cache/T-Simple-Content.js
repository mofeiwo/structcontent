/*TMODJS:{"version":9,"md5":"0a456fc3e100053d1ecd8764aef79345"}*/
template('T-Simple-Content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,cellContentTxt=$data.cellContentTxt,$string=$utils.$string,cellContentImg=$data.cellContentImg,$out='';$out+='<div class="cell-content-txt"> <textarea class="form-control text_val" rows="6" placeholder="内容">';
$out+=$escape(cellContentTxt);
$out+='</textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <input class="btn_change_pic btnChangePic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" value="图片"> <span class="cellImgList">';
$out+=$string(cellContentImg);
$out+='</span> </div>';
return new String($out);
});