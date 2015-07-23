/**
 * Created by songzhongli on 2015/7/18.
 */

var structData = {};//结构数据

function structcontent() {
    this.$jsonEditorWrap = $('.structContentWrap');
    this.$container = $(document.body);
}

structcontent.prototype.init = function () {
    this.structCell();

    this.addSiblingCell();

    this.addChildCell();

    this.upCell();

    this.downCell();

    this.uploadPic();

    this.deleteCell();
};

/**
 * 初始化结构单元
 * @param boolean $isChild 判断是否插入子级
 */
structcontent.prototype.structCell = function (isChild) {
    var self = this;
    var cellContent = '';
    if (isChild) {
        cellContent = this.cellChildModel();
    } else {
        cellContent = this.cellModel();
    }
    self.$jsonEditorWrap.children('.struct-container-content').append(cellContent);
    this.refreshActionEvent();
    this.storeJson();
}

/**
 * 添加同级单元
 */
structcontent.prototype.addSiblingCell = function () {

    var self = this;
    self.$container.on("click", '.addSiblingCellBtn', function () {
        self.structCell();
    });
}

/**
 * 添加下级单元
 */
structcontent.prototype.addChildCell = function () {
    var self = this;

    self.$container.on("click", '.addChildCellBtn', function () {
        self.structCell(true);
    });
}

/**
 * 单元模型向上移动
 */
structcontent.prototype.upCell = function () {
    var self = this;
    self.$container.on("click", '.upCellBtn', function () {
        var currentParent = $(this).parents('.struct-cell');
        var currentIndex = currentParent.index();
        if (currentIndex == 0) {
            alert('好累，上移不了!');
            return;
        } else {
            currentParent.prev().before(currentParent);
            self.refreshActionEvent();
            self.storeJson();
        }
    });
}

/**
 * 单元模型向下移动
 */
structcontent.prototype.downCell = function () {
    var self = this;

    self.$container.on("click", '.downCellBtn', function () {
        var currentParent = $(this).parents('.struct-cell');
        var cellLength = $('.struct-container-content > .struct-cell').length;
        if (currentParent.index() == (cellLength - 1)) {
            alert('好累，下移不了!');
            return;
        } else {
            currentParent.next().after(currentParent);
            self.refreshActionEvent();
            self.storeJson();
        }

    });
}

/**
 * 单元模型 存储到JSON中
 */
structcontent.prototype.storeJson = function () {
    var structContent = [];
    $('.struct-container-content > .struct-cell').each(function (index) {
        var arrImg = [];
        $(this).find('.img_val').each(function (index) {
            arrImg[index] = $(this).find('img').attr('ref');
        })
        structContent[index] = {
            'title': $(this).find('.title_val').val(),
            'text': $(this).find('.text_val').val(),
            'img': arrImg
        };
    });

    var structJsonContent = JSON.stringify(structContent);
    $('#struct_content').val(structJsonContent);
    $('#showJsonData').html(JSON.stringify(structContent,null,2));
}

/**
 *
 */
structcontent.prototype.uploadPic = function () {
    var self = this;
    self.$container.on("change", ".btn_file", function (e) {
        var $cur = $(this);

        var file = $(e.target)[0].files[0];

        if (file) {
            var fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
            if (!fileExtension.match(/.jpg|.gif|.png|.bmp|.jpeg/i)) {
                alert("您选择的文件不是图片，请重新选择！");
                $(e.target).val("");
                return;
            } else if ((file.fileSize || file.size) > (parseInt(1024) * 10240)) {
                alert("您选择的图片文件大小超过10M,请降低图片质量后重试!");
                $(e.target).val("");
                return;
            } else if (typeof FileReader !== 'undefined') {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    var imgBase64 = this.result;
                    //$cur.siblings('img').attr("src",imgBase64); //注释 防止base64 写入json
                    //上传到服务器
                    $.ajax({
                        url: "upload.php",
                        data: {
                            //'img': encodeURIComponent(imgBase64.split(',')[1])
                            'img': imgBase64.split(',')[1]
                        },
                        type: "POST",
                        dataType: "json",
                        beforeSend: function (xhr) {
                            console.log("图片上传中...");
                        },
                        success: function (res) {
                            var pic_url = "http://img2.tuniucdn.com/site/file/deyonUserCenter/images/nomarl.jpg";
                            if (res) {
                                var pic_url = res.url;

                                var picHtml = "<img src='"+pic_url+"' ref='"+pic_url+"' alt='图片' width='100' class='img-rounded'>";

                                $cur.parent('.cell-img').append(picHtml);
                            }else{
                                alert('上传失败');
                            }

                        }
                    });
                }
            } else {
                alert("您的浏览器不支持FileReader,请使用chrome,firefox等现代浏览器！");
                return;
            }
        }
    });
}


/**
 * 删除结构单元
 */
structcontent.prototype.deleteCell = function () {
    var self = this;
    self.$container.on("click", '.delCellBtn', function () {
        if (confirm('确认删除吗？')) {
            $(this).parents('.struct-cell').remove();
            self.refreshActionEvent();
            self.storeJson();
        }
        return false;
    });
}

/**
 * 刷新操作事件
 */

structcontent.prototype.refreshActionEvent = function () {
    var structCellObj = $('.struct-container-content > .struct-cell');
    var cellLength = structCellObj.length;
    if (cellLength <= 1) {
        //只有一个单元时候，因此 删除、上移和下移
        structCellObj.eq(0).find('.delCellBtn').hide();
        structCellObj.eq(0).find('.upCellBtn').hide();
        structCellObj.eq(0).find('.downCellBtn').hide();
    } else {
        //所有的操作都显示
        $('.struct-cell .delCellBtn').show();
        $('.struct-cell .upCellBtn').show();
        $('.struct-cell .downCellBtn').show();
        //第一个没有上移
        structCellObj.eq(0).find('.upCellBtn').hide();

        //最后一个没有下移
        structCellObj.eq(cellLength - 1).find('.downCellBtn').hide();
    }
}


/**
 * 结构单元 同级模板
 */
structcontent.prototype.cellModel = function () {
    var basicCellModel =
        '<div class="struct-cell cell-border">' +
        '<div class="col-sm-10">' +
        '<div class="cell-title">' +
        '<input type="text" class="form-control title_val" placeholder="标题">' +
        '</div>' +
        '<div class="cell-description">' +
        '<textarea class="form-control text_val" rows="3" placeholder="简介"></textarea>' +
        '</div>' +
        '<div class="cell-img img_val">' +
        '<input type="file" class="btn_file cell_img_hide">' +
        '<input class="btn_change_pic" type="button" onclick="$(this).siblings(\'.btn_file\').trigger(\'click\');" value="上传图片">'+
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
        '<li><a href="javascript:;" class="addSiblingCellBtn">同级</a></li>' +
        '<li><a href="javascript:;" class="addChildCellBtn">下级</a></li>' +
        '</ul>' +
        '</div>' +
        '<button type="button" class="btn btn-default delCellBtn">删除</button>' +
        '<button type="button" class="btn btn-default upCellBtn">上移</button>' +
        '<button type="button" class="btn btn-default downCellBtn">下移</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return basicCellModel;
}


/**
 * 结构单元 子级模板
 */
structcontent.prototype.cellChildModel = function () {
    var basicCellModel =
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
        '<li><a href="javascript:;" class="addSiblingCellBtn">同级</a></li>' +
        '<li><a href="javascript:;" class="addChildCellBtn">下级</a></li>' +
        '</ul>' +
        '</div>' +
        '<button type="button" class="btn btn-default delCellBtn">删除</button>' +
        '<button type="button" class="btn btn-default upCellBtn">上移</button>' +
        '<button type="button" class="btn btn-default downCellBtn">下移</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    return basicCellModel;
}


var structcontent = new structcontent();
$(function () {
    structcontent.init();
})