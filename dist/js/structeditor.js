/**
 * Created by songzhongli on 2015/7/18.
 */

function structEditor() {
    this.$jsonEditorWrap = $('.jsonEditorWrap');
}

structEditor.prototype.init = function () {
    this.structCeil();
};

/**
 * 初始化结构单元
 */
structEditor.prototype.structCeil = function () {
    var self = this;
    self.$jsonEditorWrap.children('.container-content').append(this.ceilModel());
}

/**
 * 结构单元模型
 */
structEditor.prototype.ceilModel = function () {
    var basicCeilModel =
        '<div class="struct-cell cell-border">' +
        '<div class="col-sm-10">' +
        '<div class="cell-title">' +
        '<input type="text" class="form-control" placeholder="标题">' +
        '</div>' +
        '<div class="cell-description">' +
        '<textarea class="form-control" rows="3" placeholder="简介"></textarea>' +
        '</div>' +
        '<div class="cell-img">' +
        '<img src="/dist/image/img.png" alt="图片" width="100" class="img-rounded">' +
        '<img src="/dist/image/img.png" alt="图片" width="100" class="img-rounded">' +
        '<img src="/dist/image/img.png" alt="图片" width="100" class="img-rounded">' +
        '<img src="/dist/image/img.png" alt="图片" width="100" class="img-rounded">' +
        '</div>' +
        '</div>' +
        '<div class="col-sm-2">' +
        '<div class="cell-action">' +
        '<div class="btn-group-vertical" role="group" aria-label="Vertical button group">' +
        '<div class="btn-group" role="group">' +
        '<button id="btnGroupVerticalDrop1" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">增加' +
        '<span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu" aria-labelledby="btnGroupVerticalDrop1">' +
        '<li><a href="#">同级</a></li>' +
        '<li><a href="#">下级</a></li>' +
        '</ul>' +
        '</div>' +
        '<button type="button" class="btn btn-default">删除</button>' +
        '<button type="button" class="btn btn-default">上移</button>' +
        '<button type="button" class="btn btn-default">下移</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return basicCeilModel;
}


var structEditor = new structEditor();
$(function () {
    structEditor.init();
})