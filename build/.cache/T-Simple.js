/*TMODJS:{"version":1,"md5":"af1381768b18fa88455bda2342674e00"}*/
template('T-Simple',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="struct-cell cell-border"> <div class="col-md-11 reset-margin-padding"> <div class="cell-content"> ';
include('./T-Simple-Content');
$out+=' </div> </div> <div class="col-sm-1"> ';
include('./Struct-Cell-Action');
$out+=' </div> <input type="hidden" class="struct-type" value="simple"/> </div>';
return new String($out);
});