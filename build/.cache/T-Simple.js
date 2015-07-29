/*TMODJS:{"version":7,"md5":"6407a5de9663bdc7ddd116884a3b1dd0"}*/
template('T-Simple',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+='<div class="struct-cell cell-border"> <div class="col-md-11 reset-margin-padding"> <div class="cell-content"> ';
include('./T-Simple-Content');
$out+=' </div> </div> <div class="col-sm-1"> ';
include('./Struct-Cell-Simple-Action');
$out+=' </div> <input type="hidden" class="struct-type" value="simple"/> </div>';
return new String($out);
});