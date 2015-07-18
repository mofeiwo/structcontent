/**
 * Created by songzhongli on 2015/7/18.
 */

function structcontent() {
    this.$jsonEditorWrap = $('.structContentWrap');
    this.$container = $(document.body);
}

structcontent.prototype.init = function () {
    this.structCeil();

    this.addSiblingCeil();

    this.addChildCeilBtn();

    this.deleteCell();
};

/**
 * 初始化结构单元
 * @param boolean $isChild 判断是否插入子级
 */
structcontent.prototype.structCeil = function (isChild) {
    var self = this;
    var ceilContent = '';
    if (isChild) {
        
    } else {
        ceilContent = this.ceilModel();
    }
    self.$jsonEditorWrap.children('.container-content').append(ceilContent);
}

/**
 * 添加同级单元
 */
structcontent.prototype.addSiblingCeil = function () {

    var self = this;
    self.$container.on("click", '.addSiblingCeilBtn', function () {
        self.structCeil();
    });
}

/**
 * 添加下级单元
 */
structcontent.prototype.addChildCeilBtn = function () {
    var self = this;

    self.$container.on("click", '.addChildCeilBtn', function () {
        self.structCeil();
    });
}


/**
 * 删除结构单元
 */
structcontent.prototype.deleteCell = function () {
    var self = this;
    self.$container.on("click", '.delCeilBtn', function () {
        $(this).parents('.struct-cell').remove();
    });
}


/**
 * 结构单元模型
 */
structcontent.prototype.ceilModel = function () {
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
        '<ul class="dropdown-menu w60">' +
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


var structcontent = new structcontent();
$(function () {
    structcontent.init();
})