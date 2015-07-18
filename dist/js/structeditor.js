/**
 * Created by songzhongli on 2015/7/18.
 */

function structEditor() {
    this.$jsonEditorWrap = $('.jsonEditorWrap');
    this.$addSiblingCeilBtn = $('.addSiblingCeilBtn');
}

structEditor.prototype.init = function () {
    this.structCeil();

    this.addSiblingCeil();
};

/**
 * 初始化结构单元
 */
structEditor.prototype.structCeil = function () {
    var self = this;
    self.$jsonEditorWrap.children('.container-content').append(this.ceilModel());
}

/**
 * 添加同级单元
 */
structEditor.prototype.addSiblingCeil = function () {
    console.log('11');
    var self = this;
    $('.addSiblingCeilBtn').on("click",function(){
        console.log('a');
        self.structCeil();
    });
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
        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">增加' +
        '<span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu">' +
        '<li><a href="javascript:;" class="addSiblingCeilBtn">同级</a></li>' +
        '<li><a href="javascript:;" class="addChildCeilBtn">下级</a></li>' +
        '</ul>' +
        '</div>' +
        '<button type="button" class="btn btn-default delCeilBtn">删除</button>' +
        '<button type="button" class="btn btn-default upCeilBtn">上移</button>' +
        '<button type="button" class="btn btn-default downCeilBtn">下移</button>' +
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