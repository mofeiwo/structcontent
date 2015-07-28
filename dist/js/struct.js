/**
 * 结构数据
 * Created by songzhongli on 2015/7/18.
 */

var structcontent;

if (structcontent == undefined) {
    structcontent = function (settings) {
        this.init(settings);
    };
}

/**
 * 初始化操作+配置参数
 */
structcontent.prototype.init = function (settings) {

    this.$structContentWrap = $('.structContentWrap');
    this.$structContentWrap.append(template('Struct-Tool-Bar'));
    this.$structContentWrap.append(template('T-Struct-Body'));

    this.$structContainerContent = this.$structContentWrap.children('.struct-container-content');
    this.$container = $(document.body);

    /**
     * 结构内容 key=>value
     */
    this.structCustom = settings;

    this.structCell();

    this.loadFunc();
};

/**
 * 所有功能函数集合
 */
structcontent.prototype.loadFunc = function () {
    this.addSiblingCell();

    this.addSiblingCellSimple();

    this.addChildCell();

    this.upCell();

    this.downCell();

    this.deleteCell();

    this.deleteCellContent();

    this.uploadPic();

    this.saveAllCell();
}

/**
 * 事件 集合
 */
structcontent.prototype.eventCollection = function () {
    //刷新时间 控制 操作
    this.refreshActionEvent();

    //存储事件
    this.storeJson();

}

/**
 * 初始化结构单元
 */
structcontent.prototype.structCell = function () {
    var self = this,
        cellContent;

    if (structData) {
        cellContent = template('T-Struct-Display', {structData: self.structCustom.structData});
        self.$structContainerContent.append(cellContent);
    } else {
        cellContent = template('T-Advance', {});
        self.$structContainerContent.append(cellContent);
    }


    this.eventCollection();
}

/**
 * 添加同级 高级单元
 */
structcontent.prototype.addSiblingCell = function () {

    var self = this;
    self.$container.on("click", '.addSiblingCellBtn', function () {
        var cellContentHtml = template('T-Advance', {});
        $(this).parents('.struct-cell').after(cellContentHtml);

        self.eventCollection();
    });


}

/**
 * 添加同级 简单单元
 */
structcontent.prototype.addSiblingCellSimple = function () {
    var self = this;
    self.$container.on("click", '.addSiblingCellSimpleBtn', function () {
        var cellContentHtml = template('T-Simple', {});
        $(this).parents('.struct-cell').after(cellContentHtml);

        self.eventCollection();
    });


}

/**
 * 添加子集单元
 */
structcontent.prototype.addChildCell = function () {
    var self = this;

    self.$container.on("click", '.addChildCellBtn', function () {
        var cellContentChildHtml = template('T-Advance-Content', {});
        $(this).parents('.struct-cell').find('.cell-content').append(cellContentChildHtml);

        self.eventCollection();
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
            self.eventCollection();
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

            self.eventCollection();
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

            self.eventCollection();
        }
        return false;
    });
}


/**
 * 删除 高级 结构单元中 （文字和图片 整体删除）
 */
structcontent.prototype.deleteCellContent = function () {
    var self = this;
    self.$container.on("click", '.delCellContentBtn', function () {
        var cellContentChildCount = $(this).parents('.cell-content').find('.cell-content-child').length;
        if (cellContentChildCount > 1) {
            if (confirm('确认删除吗？')) {
                $(this).parents('.cell-content-child').remove();

                self.eventCollection();
            }
            return false;
        } else {
            alert('放过我吧！');
            return false;
        }


    });
}

/**
 * 保存按钮
 */
structcontent.prototype.saveAllCell = function () {
    var self = this;
    self.$container.on("click", '.btn_save_all', function () {
        self.storeJson();
        alert('保存成功');
    });
}

/**
 * 刷新操作事件
 */

structcontent.prototype.refreshActionEvent = function () {
    // 所有结构单元 对象
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
 * 单元模型 存储到JSON中
 */
structcontent.prototype.storeJson = function () {
    var self = this;
    var structContent = [];
    $('.struct-container-content > .struct-cell').each(function (index) {
        var structType = $(this).find('.struct-type').val();
        var arrContent = [];//内容数组
        if (structType == 'advance') {
            $(this).find('.cell-content-child').each(function (childIdx) {
                var arrImg = [];//图片数组
                var currImgLength = $(this).find('img').length;

                if (parseInt(currImgLength)) {
                    $(this).find('img').each(function (idx) {
                        arrImg[idx] = $(this).attr('data-src');
                    })
                }
                arrContent[childIdx] = {
                    'txt': $(this).find('.text_val').val(),
                    'img': arrImg
                };
            });

            structContent[index] = {
                'title': $(this).find('.title_val').val(), //单元标题
                'type': structType, //title-text-img
                'content': arrContent,
            };
        } else if (structType == 'simple') {
            var arrImg = [];//图片数组

            var currImgLength = $(this).find('img').length;

            if (parseInt(currImgLength)) {
                $(this).find('img').each(function (idx) {
                    arrImg[idx] = $(this).attr('data-src');
                })
            }

            arrContent = {
                'txt': $(this).find('.text_val').val(),
                'img': arrImg
            };

            structContent[index] = {
                'type': structType, //title-text-img
                'content': arrContent,
            };
        }


    });

    var structJsonContent = JSON.stringify(structContent);
    $("input[name='" + self.structCustom.structField + "']").val(structJsonContent);

    //用于右侧显示模块
    $('#showJsonData').html(JSON.stringify(structContent, null, 2));
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

                                var picHtml = "<img src='" + pic_url + "' data-src='" + pic_url + "' alt='图片' width='80' class='img-rounded'>";

                                $cur.parent('.cell-content-img').append(picHtml);
                            } else {
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