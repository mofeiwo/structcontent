/*TMODJS:{"version":13,"md5":"64104f5557d9535c198a1f4dfe91e050"}*/
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
$out+=' <div class="cell-content-child"> <div class="col-md-11 reset-margin-padding"> <div class="cell-content-txt"> <textarea class="form-control text_val" rows="6" placeholder="内容">';
$out+=$escape(content.txt);
$out+='</textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <button class="btn btn-default btn_change_pic glyphicon glyphicon-picture btnChangePic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" title="上传图片"></button> <span class="cellImgList"> ';
if(content.img && content.img.length>0){
$out+=' ';
$each(content.img,function(image,$index){
$out+=' ';
if(image.isFb){
$out+=' <img src="';
$out+=$escape(image.small);
$out+='" data-src="';
$out+=$escape(image.original);
$out+='" class=\'img-rounded\' width="80"><i class=\'fa fa-fw fa-close delUploadFile\' style=\'cursor: pointer\' title=\'删除文件\'></i> ';
}else{
$out+=' <img src="';
$out+=$escape(image.original);
$out+='" data-src="" class=\'img-rounded\' width="80"><i class=\'fa fa-fw fa-close delUploadFile\' style=\'cursor: pointer\' title=\'删除文件\'></i> ';
}
$out+=' ';
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
$out+=' <div class="struct-cell cell-border"> <div class="col-md-11 reset-margin-padding"> <div class="cell-content"> <div class="cell-content-txt"> <textarea class="form-control text_val" rows="6" placeholder="内容">';
$out+=$escape(cell.content.txt);
$out+='</textarea> </div> <div class="cell-content-img"> <input type="file" class="btn_file cell_img_hide"> <button class="btn btn-default btn_change_pic glyphicon glyphicon-picture btnChangePic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" title="上传图片"></button> <span class="cellImgList"> ';
if(cell.content.img && cell.content.img.length>0){
$out+=' ';
$each(cell.content.img,function(image,$index){
$out+=' ';
if(image.isFb){
$out+=' <img src="';
$out+=$escape(image.small);
$out+='" data-src="';
$out+=$escape(image.original);
$out+='" class=\'img-rounded\' width="80"><i class=\'fa fa-fw fa-close delUploadFile\' style=\'cursor: pointer\' title=\'删除文件\'></i> ';
}else{
$out+=' <img src="';
$out+=$escape(image.original);
$out+='" data-src="" class=\'img-rounded\' width="80"><i class=\'fa fa-fw fa-close delUploadFile\' style=\'cursor: pointer\' title=\'删除文件\'></i> ';
}
$out+=' ';
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