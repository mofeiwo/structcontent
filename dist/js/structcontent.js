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

    this.addChildCeil();

    this.upCeil();

    this.downCeil();

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
        ceilContent = this.ceilChildModel();
    } else {
        ceilContent = this.ceilModel();
    }
    self.$jsonEditorWrap.children('.struct-container-content').append(ceilContent);
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
structcontent.prototype.addChildCeil = function () {
    var self = this;

    self.$container.on("click", '.addChildCeilBtn', function () {
        self.structCeil(true);
    });
}

/**
 * 单元模型向上移动
 */
structcontent.prototype.upCeil = function () {
    var self = this;
    self.$container.on("click", '.upCeilBtn', function () {
        var currentParent = $(this).parents('.struct-cell');
        var currentIndex = currentParent.index();
        if (currentIndex == 0) {
            alert('好累，上移不了!');
            return;
        } else {
            currentParent.prev().before(currentParent);
        }
    });
}

/**
 * 单元模型向下移动
 */
structcontent.prototype.downCeil = function () {
    var self = this;

    self.$container.on("click", '.downCeilBtn', function () {
        var currentParent = $(this).parents('.struct-cell');
        var ceilLength = $('.struct-container-content > .struct-cell').length;
        if (currentParent.index() == (ceilLength - 1)) {
            alert('好累，下移不了!');
            return;
        }else{
            currentParent.next().after(currentParent);
        }

    });
}


/**
 * 删除结构单元
 */
structcontent.prototype.deleteCell = function () {
    var self = this;
    self.$container.on("click", '.delCeilBtn', function () {
        if(confirm('确认删除吗？')){
            $(this).parents('.struct-cell').remove();
        }
        return false;
    });
}


/**
 * 结构单元 同级模板
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



/**
 * 结构单元 子级模板
 */
structcontent.prototype.ceilChildModel = function () {
    var basicCeilModel =
        '<div class="struct-cell-children cell-border-children">' +
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