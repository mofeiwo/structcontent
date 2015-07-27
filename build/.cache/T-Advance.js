/*TMODJS:{"version":1,"md5":"920110e5b4aea6a48616df2fdfe7ba73"}*/
template('T-Advance',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="struct-cell cell-border"> <div class="col-md-11 reset-margin-padding"> <div class="cell-title"> <input type="text" class="form-control title_val" placeholder="标题"> </div> <div class="cell-content"> ';
include('./T-Advance-Content');
$out+=' </div> </div> <div class="col-md-1"> ';
include('./Struct-Cell-Action');
$out+=' </div> <input type="hidden" class="struct-type" value="advance"/> </div>';
return new String($out);
});