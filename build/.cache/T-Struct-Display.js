/*TMODJS:{"version":3,"md5":"a51931479e02828f498a1c8fd7f8d9cd"}*/
template('T-Struct-Display',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,structData=$data.structData,$each=$utils.$each,cell=$data.cell,idx=$data.idx,$escape=$utils.$escape,content=$data.content,$index=$data.$index,image=$data.image,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';if(structData && structData.length>0){
$out+=' ';
$each(structData,function(cell,idx){
$out+=' ';
if(cell.type=='advance'){
$out+=' <div class="struct-cell cell-border"> <div class="col-md-11 reset-margin-padding"> <div class="cell-title"> <input type="text" value="';
$out+=$escape(cell.title);
$out+='" class="form-control title_val" placeholder="标题"> </div> <div class="cell-content"> ';
$each(cell.content,function(content,$index){
$out+=' <div class="cell-content-child"> <div class="col-md-11 reset-margin-padding"> <div class="cell-content-txt"> <textarea class="form-control text_val" rows="3" placeholder="内容">';
$out+=$escape(content.txt);
$out+='</textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <input class="btn_change_pic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" value="图片"> <span class="cellImgList"> ';
if(content.img && content.img.length>0){
$out+=' ';
$each(content.img,function(image,$index){
$out+=' <img src="';
$out+=$escape(image);
$out+='" data-src="';
$out+=$escape(image);
$out+='" width=\'80\' class=\'img-rounded\'> ';
});
$out+=' ';
}
$out+=' </span> </div> </div> <div class="col-md-1"> ';
include('./Struct-Cell-Content-Action');
$out+=' </div> </div> ';
});
$out+=' </div> </div> <div class="col-md-1"> ';
include('./Struct-Cell-Action');
$out+=' </div> <input type="hidden" class="struct-type" value="advance"/> </div> ';
}else if(cell.type=='simple'){
$out+=' <div class="struct-cell cell-border"> <div class="col-md-11 reset-margin-padding"> <div class="cell-content"> <div class="cell-content-txt"> <textarea class="form-control text_val" rows="3" placeholder="内容">';
$out+=$escape(cell.content.txt);
$out+='</textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <input class="btn_change_pic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" value="图片"> <span class="cellImgList"> ';
if(cell.content.img && cell.content.img.length>0){
$out+=' ';
$each(cell.content.img,function(image,$index){
$out+=' <img src="';
$out+=$escape(image);
$out+='" data-src="';
$out+=$escape(image);
$out+='" width=\'80\' class=\'img-rounded\'> ';
});
$out+=' ';
}
$out+=' </span> </div> </div> </div> <div class="col-sm-1"> ';
include('./Struct-Cell-Simple-Action');
$out+=' </div> <input type="hidden" class="struct-type" value="simple"/> </div> ';
}
$out+=' ';
});
$out+=' ';
}
$out+=' ';
return new String($out);
});