/*TMODJS:{"version":2,"md5":"e764e97be309b061c91a0171d90943c1"}*/
template('T-Simple-Content',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,cellContentTxt=$data.cellContentTxt,$out='';$out+='<div class="cell-content-txt"> <textarea class="form-control text_val" rows="3" placeholder="内容">';
$out+=$escape(cellContentTxt);
$out+='</textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <input class="btn_change_pic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" value="图片"> </div>';
return new String($out);
});