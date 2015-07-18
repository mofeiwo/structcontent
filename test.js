/**
 * Created by songzhongli on 2015/7/18.
 */
function BlogPublish() {
    this.$tripNav = $(".trip-nav");
    this.$blogControl = $(".blog-control");
    this.$inputLimit = $(".input-limit");
    this.$photoManagerPopBox = $("#photoManagerPopBox");
    this.$tripAddBtn = $("#trip_add");
    this.$addrAddBtn = $("#addr_add");
    this.$addrEditBtn = $(".addr-control-addr");
    this.$addrConfirmBtn = $("#addrConfirm");
    this.$editAddrConfirmBtn = $("#editAddrConfirm");
    this.TEXTAREA_MAX_PUBLISHTITLE = 30;
    this.DEFAULT_TXT_PUBLISHMAIN = '这里开始写游记正文';
    this.DEFAULT_TXT_PUBLISHTITLE = '给游记取个好标题，为自己代言~';
    this.DEFAULT_TXT_TRIP_START = '请在这里开始这一天的旅行记忆~';
    this.DEFAULT_TXT_TRIP_END = '请在这里结束这一天的旅行记忆~';
    this.DEFAULT_TXT_PUBLISHEND = '给你的游记结个尾吧~';
    this.$pTitle = $("#p-title");
    this.$pMain = $(".publish-main");
    this.$tirpList = $(".trip-list");
    this.$tripDesStart = $(".trip-des-start");
    this.$tripDesEnd = $(".trip-des-end");
    this.$addrRecord = $(".addr-record");
    this.$pEnd = $(".publish-end");
    this.$photoList = $(".photo-uploaded-list");
    this.$publishRight = $(".publish-right");
    this.$tripDayNextBtn = $(".trip-day-next");
    this.$orderBindPanel = $("#orderBindPanel");
    this.$orderState = $(".order-state");
    this.$scheduleAddrAdd = $(".schedule-addr-add");
    this.$addMoreAddr = $(".addr-add-more");
    this.dayNum = 0;
    this.addrNum = 0;
    this.imgInsertFlag = 0;
}
BlogPublish.prototype.init = function () {
    this.bindEvent();
    this.lazyloadImg();
};
BlogPublish.prototype.bindEvent = function () {
    var self = this;
    this.$publishRight.pin({containerSelector: ".bodybg-gray"});
    $(window).scroll(function () {
        var wh = $(document).scrollTop();
        var dh = $(".bodybg-gray").offset().top;
        var footer = $(".offer_service").offset().top;
        var rightHeight = self.$publishRight.height();
        if (wh > dh) {
            if ((footer - wh) > rightHeight) {
                self.$publishRight.addClass("p-fix");
            }
            else {
                self.$publishRight.removeClass("p-fix");
                self.$publishRight.css("top", footer - rightHeight);
            }
        } else {
            self.$publishRight.removeClass("p-fix");
        }
    });
    this.placeholder(this.$pTitle, this.DEFAULT_TXT_PUBLISHTITLE, this.TEXTAREA_MAX_PUBLISHTITLE);
    this.$orderState.bind("click", function () {
        self.$orderState.removeClass("o-selected");
        $(this).addClass("o-selected");
    });
    $(".order-modify-btn").bind("click", function () {
        self.$orderBindPanel.show();
    });
    $(".order-popup").find(".close").bind("click", function () {
        self.$orderBindPanel.hide();
    })
    this.createEditor();
    this.photoEventBind();
    this.tripEventBind();
    this.addrEventBind();
    this.eduiEventBind();
    this.controlEventBind();
    $(".trip-day").hover(function () {
        $(this).find(".trip-control").show();
    }, function () {
        if ($(this).attr("class").indexOf("trip-show") == -1) {
            $(this).find(".trip-control").hide();
        }
    });
    this.showBlogGuide();
    $(".default-txt").live("click", function () {
        var conId = $(this).next().find(".edui-body-container").attr("id");
        UM.getEditor(conId).focus();
    })
};
BlogPublish.prototype.createEditor = function () {
    var self = this;
    $(".editor-item").each(function () {
        UM.getEditor($(this).attr("id"));
    });
};
BlogPublish.prototype.photoEventBind = function () {
    var self = this;
    $(".photo-uploaded-list").find("img").each(function () {
        var $this = $(this);
        $(this).bind("mousedown", function () {
            self.imgInsertFlag = 1;
        });
        $(this).bind("mouseup", function () {
            self.imgInsertFlag = 0;
        });
        if (UM.browser.ie) {
            $(this).bind("mousedown", function () {
                insertImg();
            });
        } else {
            $(this).bind("click", function () {
                insertImg();
            });
        }
        var insertImg = function () {
            $(".edui-body-container").each(function () {
                var editObj = UM.getEditor($(this).attr("id"));
                if (editObj.isFocus()) {
                    var imgUrl = $this.attr("src");
                    var dataImgId = $this.attr("data-imgid");
                    var imgLat = $this.attr("imglat");
                    var imgLng = $this.attr("imglng");
                    var urlTemp = imgUrl;
                    if (imgUrl.indexOf("_w200") != -1) {
                        urlTemp = imgUrl.replace(/_w200_h200_c1/g, "_w700_h0_c0");
                    }
                    editObj.execCommand('insertHtml', '<br/><img src=' + urlTemp + ' data-imgid=' + dataImgId + ' imglat=' + imgLat + ' imglng=' + imgLng + ' /><br/>');
                    return false;
                }
            });
        }
    });
};
BlogPublish.prototype.tripEventBind = function () {
    var self = this;
    this.$tripAddBtn.bind("click", function () {
        addTripEvent();
    });
    this.$tripDayNextBtn.bind("click", function () {
        addTripEvent();
    });
    $(".trip-list").find(".trip-nav").live("click", function () {
        if ($(this).parent().attr("class").indexOf("trip-show") == -1) {
            $(this).parent().addClass("trip-show").siblings().removeClass("trip-show");
        } else {
            $(this).parent().removeClass("trip-show");
        }
    });
    var addTripEvent = function () {
        self.dayNum++;
        $.ajax({
            type: 'post',
            url: apiParams['actSchedule'],
            data: {schedule_date: apiParams['tourTime'], tid: apiParams['tid']},
            dataType: "json",
            success: function (response) {
                if (response['success']) {
                    var schedule_day = response['data']['schedule_day'];
                    var schedule_id = response['data']['schedule_id'];
                    var cloneNode = $('#trip_day').clone(true);
                    cloneNode.removeAttr('id');
                    cloneNode.attr('id', 'trip_day_' + schedule_id).show();
                    cloneNode.attr('data-scheduleId', response['data']['schedule_id']);
                    cloneNode.find('.day-num').text(schedule_day);
                    cloneNode.find('.item-clone').attr('id', 'trip_des_' + schedule_id).addClass('editor-item');
                    cloneNode.find(".trip-time").attr("id", "trip_time_" + schedule_id);
                    cloneNode.find(".editor-trip-end").attr("id", "trip_end_" + schedule_id).addClass('editor-item');
                    cloneNode.find(".trip_place_list").attr("id", "trip_place_list_" + schedule_id);
                    self.$tirpList.append(cloneNode);
                    if (schedule_day == 1) {
                        if (parseInt(apiParams['tourTime'])) {
                            $("#trip_day_" + schedule_id).find(".trip-time").text(response['data']['schedule_date']);
                        } else {
                            $("#trip_day_" + schedule_id).find('.trip-control').show();
                            $("#trip_day_" + schedule_id).find('.trip-control-date').click();
                        }
                    } else {
                        if (response['data']['schedule_date']) {
                            $("#trip_day_" + schedule_id).find(".trip-time").text(response['data']['schedule_date']);
                        }
                    }
                    UM.getEditor('trip_des_' + schedule_id);
                    self.$tripDayNextBtn.show();
                    self.$pEnd.show();
                    resetMoreHandle('schedule');
                    var $tripDayAll = $('.publish-content').find('.trip-day');
                    $tripDayAll.eq($tripDayAll.length - 1).addClass('trip-show').siblings().removeClass('trip-show');
                    $('html,body').animate({scrollTop: $('#trip_day_' + schedule_id).offset().top}, 800);
                } else {
                    alert(response['msg']);
                }
            }
        });
    }
    var currentDateIndex;
    var lastDate;
    $(".trip-day").find(".trip-control-date").live("click", function () {
        currentDateIndex = $(this).parents('.trip-day').index();
        lastDate = $(this).parents('.trip-day').find('.trip-time').text();
        WdatePicker({
            el: $(this).parents(".trip-day").find(".trip-time").attr("id"),
            maxDate: '%y-%M-%d',
            position: {left: -50, top: -50},
            onpicked: changeTripsDate
        });
    });
    function changeTripsDate() {
        var currentDoDate = $dp.cal.getDateStr();
        var nowDateObj = new Date();
        var nowDate = nowDateObj.getFullYear() + "-" + (nowDateObj.getMonth() + 1) + "-" + nowDateObj.getDate();
        var tripsDates = new Object();
        var allowModDate = true;
        $('.trip-list').find('.trip-day').each(function (n) {
            var indexDate = $(this).find('.trip-time').text();
            var indexDateNew = addDate(currentDoDate, (n - currentDateIndex));
            if (!compareDate(indexDateNew)) {
                allowModDate = false;
                $('.trip-list').find('.trip-day').eq(currentDateIndex).find('.trip-time').text(lastDate);
                return false;
            } else {
                tripsDates[$(this).attr('data-scheduleId')] = indexDateNew;
            }
        });
        if (allowModDate) {
            changeTrips(apiParams['changeDate'], {tid: apiParams['tid'], dates: tripsDates});
        } else {
            alert('行程日期不能大于当前时间!');
            return false;
        }
    }

    function changeTrips(subUrl, postData) {
        $.ajax({
            type: 'post', url: subUrl, data: postData, dataType: "json", async: false, beforeSend: function () {
                $(".draft-save").show();
                $(".draft-preview").hide();
            }, success: function (response) {
                $(".draft-save").hide();
                $(".draft-preview").show();
                if (response['success']) {
                    for (var schedule_id in postData['dates']) {
                        $("#trip_day_" + schedule_id).find('.trip-time').text(postData['dates'][schedule_id]);
                    }
                }
            }
        });
    }

    $(".trip-control-more").live("click", function () {
        var $moreBtn = $(this).parent().find(".more-btn-list");
        $moreBtn.show();
        $moreBtn.bind("mouseover", function () {
            $(this).show();
        })
        $moreBtn.bind("mouseout", function () {
            $(this).hide();
        });
    });
    $(".addr-control-more").live("click", function () {
        var $moreBtn = $(this).parent().find(".more-btn-list");
        $moreBtn.show();
        $moreBtn.bind("mouseover", function () {
            $(this).show();
        })
        $moreBtn.bind("mouseout", function () {
            $(this).hide();
        });
    });
    $(".more-btn-list").find("li").live("click", function () {
        $(this).parents(".more-btn-list").hide();
    });
    $('.trip-list').find('.trip-control').find('.add-before').live('click', function () {
        tripsbeforeAfter($(this), 'before');
    });
    $('.trip-list').find('.trip-control').find('.add-after').live('click', function () {
        tripsbeforeAfter($(this), 'after');
    });
    function tripsbeforeAfter(currentTripObj, type) {
        var tripListLength = $('.trip-list').find('.trip-day').length;
        var tripMaxDate = $('.trip-list').find('.trip-day').eq(tripListLength - 1).find('.trip-time').text();
        if ((!isEmpty(tripMaxDate) && compareDate(addDate(tripMaxDate, 1))) || isEmpty(tripMaxDate)) {
            var schedule_id, insert_schedule_date, insert_index;
            if (type == 'before') {
                schedule_id = currentTripObj.parents('.trip-day').attr('data-scheduleId');
                insert_schedule_date = currentTripObj.parents('.trip-day').find('.trip-time').text();
                insert_index = currentTripObj.parents('.trip-day').index();
            } else if (type == 'after') {
                schedule_id = currentTripObj.parents('.trip-day').next().attr('data-scheduleId');
                insert_schedule_date = currentTripObj.parents('.trip-day').next().find('.trip-time').text();
                insert_index = currentTripObj.parents('.trip-day').next().index();
            }
            if (insert_index == -1) {
                addTripEvent();
            } else {
                $.ajax({
                    type: 'post',
                    url: apiParams['moreSchedule'],
                    data: {schedule_id: schedule_id, tid: apiParams['tid']},
                    dataType: "json",
                    success: function (response) {
                        if (response['success']) {
                            var new_schedule_id = response['data']['schedule_id'];
                            var cloneNode = $('#trip_day').clone(true);
                            cloneNode.removeAttr('id');
                            cloneNode.attr('id', 'trip_day_' + new_schedule_id).show();
                            cloneNode.attr('data-scheduleId', new_schedule_id);
                            cloneNode.find('.item-clone').attr('id', 'trip_des_' + new_schedule_id).addClass('editor-item');
                            cloneNode.find(".trip-time").attr("id", "trip_time_" + new_schedule_id);
                            cloneNode.find(".editor-trip-end").attr("id", "trip_end_" + new_schedule_id).addClass('editor-item');
                            cloneNode.find(".trip_place_list").attr("id", "trip_place_list_" + new_schedule_id);
                            self.$tirpList.append(cloneNode);
                            $("#trip_day_" + new_schedule_id).insertBefore("#trip_day_" + schedule_id);
                            $('.trip-list').find('.trip-day').each(function (index) {
                                if (index >= insert_index) {
                                    $(this).find('.day-num').text((index + 1));
                                    if (!isEmpty(insert_schedule_date)) {
                                        $(this).find('.trip-time').text(addDate(insert_schedule_date, (index - insert_index)));
                                    }
                                    $(this).find('.trip-control-del').attr('data-day', (index + 1));
                                }
                            });
                            UM.getEditor('trip_des_' + new_schedule_id);
                            self.$tripDayNextBtn.show();
                            self.$pEnd.show();
                            resetMoreHandle('schedule');
                            var $tripDayAll = $('.publish-content').find('.trip-day');
                            $tripDayAll.eq($tripDayAll.length - 1).addClass('trip-show').siblings().removeClass('trip-show');
                            $('html,body').animate({scrollTop: $('#trip_day_' + new_schedule_id).offset().top}, 800);
                        } else {
                            alert(response['msg']);
                        }
                    }
                });
            }
        } else {
            alert('行程中最大日期不能大于当前时间！');
            return false;
        }
    }

    $('.trip-list').find('.trip-control').find('.move-before').live('click', function () {
        moveSchedule($(this), 'up');
    });
    $('.trip-list').find('.trip-control').find('.move-after').live('click', function () {
        moveSchedule($(this), 'down');
    });
    function moveSchedule(currentObj, type) {
        var schedule_id, move_schedule_id, current_index, move_current_index, error_msg;
        var tripListLength = $('.trip-list').find('.trip-day').length;
        if (type == 'up') {
            schedule_id = currentObj.parents('.trip-day').attr('data-scheduleId');
            move_schedule_id = currentObj.parents('.trip-day').prev().attr('data-scheduleId');
            current_index = currentObj.parents('.trip-day').index();
            move_current_index = currentObj.parents('.trip-day').prev().index();
            error_msg = '第一天无法上移！';
        } else if (type == 'down') {
            schedule_id = currentObj.parents('.trip-day').attr('data-scheduleId');
            move_schedule_id = currentObj.parents('.trip-day').next().attr('data-scheduleId');
            current_index = currentObj.parents('.trip-day').index();
            move_current_index = currentObj.parents('.trip-day').next().index();
            error_msg = '最后一天无法下移！';
        } else {
            return false;
        }
        if (move_current_index == -1) {
            alert(error_msg);
            return false;
        } else {
            var schedules = new Object();
            schedules = {'schedule_id': schedule_id, 'move_schedule_id': move_schedule_id};
            $.ajax({
                type: 'post',
                url: apiParams['moveSchedule'],
                data: {schedules: schedules, tid: apiParams['tid']},
                dataType: "json",
                success: function (response) {
                    if (response['success']) {
                        if (type == 'up') {
                            $("#trip_day_" + schedule_id).insertBefore("#trip_day_" + move_schedule_id);
                        } else {
                            $("#trip_day_" + move_schedule_id).insertBefore("#trip_day_" + schedule_id);
                        }
                        var current_shedule_date = $("#trip_time_" + schedule_id).text();
                        var move_schedule_date = $("#trip_time_" + move_schedule_id).text();
                        $("#trip_time_" + schedule_id).text(move_schedule_date);
                        $("#trip_time_" + move_schedule_id).text(current_shedule_date);
                        var current_shedule_day = $("#trip_day_" + schedule_id).find('.day-num').text();
                        var move_schedule_day = $("#trip_day_" + move_schedule_id).find('.day-num').text();
                        $("#trip_day_" + schedule_id).find('.day-num').text(move_schedule_day);
                        $("#trip_day_" + move_schedule_id).find('.day-num').text(current_shedule_day);
                        resetMoreHandle('schedule');
                        resetMoreHandle('inner_place');
                        var $tripDayAll = $('.publish-content').find('.trip-day');
                        $tripDayAll.eq(move_current_index).addClass('trip-show').siblings().removeClass('trip-show');
                        $('html,body').animate({scrollTop: $('#trip_day_' + move_schedule_id).offset().top}, 800);
                    } else {
                        alert(response['msg']);
                    }
                }
            });
        }
    }
};
BlogPublish.prototype.addrEventBind = function () {
    this.$addrAddBtn.mousedown(function () {
        showAddrPop();
    });
    this.$addrEditBtn.bind("click", function () {
        var obj = $(this).parents(".addr-item");
        showEditAddrPop(obj);
    });
    this.$addMoreAddr.live('click', function () {
        scheduleAddr($(this));
    });
    this.$scheduleAddrAdd.live('click', function () {
        scheduleAddr($(this));
    });
    var scheduleAddr = function ($scheduleObj) {
        var belong_to = $scheduleObj.parents(".trip-day").attr('data-scheduleId');
        $("#placeBelongTo").val(belong_to);
        $('#addrConfirm').attr('data-addLocation', $scheduleObj.parents(".trip-day").attr("id"));
        $("#addrPopBox").find(".poi").remove();
        $('#addrPopBox').show();
        $("#btnAddPoi").focus();
    }
    var showAddrPop = function () {
        $(".edui-body-container").each(function (index) {
            var editObj = UM.getEditor($(this).attr("id"));
            if (editObj.isFocus()) {
                var $parentObj = editObj.$container.parent().attr("class");
                if ($parentObj != "publish-main" && $parentObj != "publish-end") {
                    var placeScheduleId = editObj.$container.parents(".trip-day").attr('data-scheduleId');
                    $("#placeBelongTo").val(parseInt(placeScheduleId));
                    $('#addrConfirm').attr('data-addLocation', $(this).parents(".trip-day").attr("id"));
                    return false;
                }
            }
            if (index == $(".edui-body-container").length - 1) {
                $('#addrConfirm').attr('data-addLocation', 'addr-list-outer');
            }
        });
        $("#addrPopBox").find(".poi").remove();
        $("#btnAddPoi").val("");
        $("#btnAddPoi").siblings("span").css("display", "block");
        $("#addSelectAddress").hide();
        $('#addrPopBox').show();
        $("#btnAddPoi").focus();
    }
    this.$addrConfirmBtn.click(function () {
        var moreAdd = parseInt($(this).attr("data-moreAdd"));
        if (moreAdd) {
            submitAddPlace($(this).attr('data-currentIndex'), $(this).attr('data-currentPlaceId'));
        } else {
            var addrAddLocation = $(this).attr('data-addLocation');
            var placeBelongTo = parseInt($("#placeBelongTo").val());
            if (placeBelongTo) {
                poiEach($('#' + addrAddLocation).find(".addr-list"), placeBelongTo);
            } else {
                poiEach($('.' + addrAddLocation), placeBelongTo);
            }
        }
        return false;
    });
    var showEditAddrPop = function (obj) {
        $("#editAddrPopBox").find(".poi").remove();
        $("#editPlaceBelongTo").attr("placeId", obj.attr("id"));
        var content = '<div class="poi" district-name="' + obj.attr("data-districtname") + '" district-id="' + obj.attr("data-districtid") + '" poi-name="' + obj.attr("data-poiname") + '" poi-id="' + obj.attr("data-poiid") + '" poi-type="' + obj.attr("data-poitype") + '"><a href="javascript:void(0);" class="del_address" id="delEditAddress">&#xe619;</a>' + obj.attr("data-poiname") + '</div>'
        $("#editPoiAdd").before(content);
        $("#btnEditPoi").siblings("span").hide();
        $("#btnEditPoi").val("");
        $("#btnEditPoi").hide();
        $('#editAddrPopBox').show();
        $("#editSelectAddress").hide();
        delAddress("btnEditPoi");
    }
    this.$editAddrConfirmBtn.click(function () {
        var poiObj = $("#editAddrPopBox").find(".poi");
        if (poiObj.length == 0) {
            alert("请输入修改后的地点");
            return false;
        } else {
            var divId = $("#editPlaceBelongTo").attr("placeId");
            if (divId) {
                placeObj = $("#" + divId);
                var placeId = parseInt(placeObj.attr("data-placeid"));
                var belongTo = parseInt(placeObj.attr("data-belongto"));
                var newPoi = poiObj.eq(0);
                var poiData = {
                    place_id: placeId,
                    tid: apiParams['tid'],
                    poi_type: newPoi.attr("poi-type"),
                    poi_id: newPoi.attr("poi-id"),
                    poi_name: newPoi.attr("poi-name"),
                    district_id: newPoi.attr("district-id"),
                    district_name: newPoi.attr("district-name")
                };
                $.ajax({
                    type: 'post',
                    url: apiParams['actPlace'],
                    data: poiData,
                    dataType: "json",
                    success: function (response) {
                        if (response['success']) {
                            placeObj.attr("data-districtname", newPoi.attr("district-name"));
                            placeObj.attr("data-districtid", newPoi.attr("district-id"));
                            placeObj.attr("data-poiname", newPoi.attr("poi-name"));
                            placeObj.attr("data-poiid", newPoi.attr("poi-id"));
                            placeObj.attr("data-poitype", newPoi.attr("poi-type"));
                            placeObj.find(".addr-title .addr-name").html(newPoi.attr("poi-name"));
                            refreshTripsPlace(belongTo);
                        } else {
                            alert(response['msg']);
                            return false;
                        }
                    }
                });
            }
            $("#editAddrPopBox").hide();
        }
    });
    var poiEach = function (addrObj, placeBelongTo) {
        var placeAddrNum = 0;
        var poiNum = $('.poi').length;
        if (parseInt(poiNum) <= 0) {
            alert("请添加地点！");
            return false;
        }
        $(".poi").each(function (index) {
            placeAddrNum++;
            var poiObj = $(this);
            var poiData = {
                belong_to: placeBelongTo,
                tid: apiParams['tid'],
                poi_type: poiObj.attr("poi-type"),
                poi_id: poiObj.attr("poi-id"),
                poi_name: poiObj.attr("poi-name"),
                district_id: poiObj.attr("district-id"),
                district_name: poiObj.attr("district-name")
            };
            $.ajax({
                type: 'post',
                url: apiParams['actPlace'],
                data: poiData,
                dataType: "json",
                async: false,
                success: function (response) {
                    if (response['success']) {
                        addAddrEvent(addrObj, poiObj, response['data']);
                        if (index == (poiNum - 1)) {
                            if (parseInt(placeBelongTo)) {
                                if ($("#trip_day_" + placeBelongTo).find('.addr-add-more').length != 0) {
                                    $("#trip_day_" + placeBelongTo).find('.addr-add-more').remove();
                                }
                                $("#trip_day_" + placeBelongTo).find('.schedule-addr-add').hide();
                                var addrAddMore = $('#addrAddMore').clone(true);
                                addrAddMore.show();
                                addrObj.append(addrAddMore);
                                $("#trip_day_" + response['data']['belong_to']).find('.trip-end').show();
                                refreshTripsPlace(response['data']['belong_to']);
                                resetMoreHandle('inner_place', response['data']['belong_to']);
                                $("#addrPopBox").hide();
                                $('html,body').animate({scrollTop: $('#addr_day_' + response['data']['place_id']).offset().top}, 800);
                            } else {
                                $("#addrPopBox").hide();
                                $('html,body').animate({scrollTop: $('#addr_day_' + response['data']['place_id']).offset().top}, 800);
                                resetMoreHandle('outer_place');
                            }
                        }
                    } else {
                        alert(response['msg']);
                        return false;
                    }
                }
            });
        });
    }
    var addAddrEvent = function (obj, poiObj, data) {
        var cloneNode = $('#addr_item').clone(true);
        cloneNode.removeAttr('id');
        cloneNode.attr('id', 'addr_day_' + data['place_id']).show();
        cloneNode.find('.item-clone').attr('id', 'addr_record_' + data['place_id']).addClass('editor-item');
        cloneNode.attr('data-poiId', poiObj.attr("poi-id"));
        cloneNode.attr('data-poiType', poiObj.attr("poi-type"));
        cloneNode.attr('data-poiName', poiObj.attr("poi-name"));
        cloneNode.attr('data-districtId', poiObj.attr("district-id"));
        cloneNode.attr('data-districtName', poiObj.attr("district-name"));
        cloneNode.attr('data-belongTo', data['belong_to']);
        cloneNode.attr('data-placeId', data['place_id']);
        cloneNode.find('.addr-name').text(poiObj.attr("poi-name"));
        cloneNode.find('.addr-add').hide();
        cloneNode.find('.addr-title').show();
        obj.append(cloneNode);
        initPlaceData();
        UM.getEditor('addr_record_' + data['place_id']);
    }
    $('.addr-list').find('.add-before').live('click', function () {
        $('#addrConfirm').attr('data-moreAdd', 1);
        $('#addrPopBox').show();
        $("#addrPopBox").find(".poi").remove();
        $("#editAddrPopBox").find(".poi").remove();
        $("#btnAddPoi").focus();
        $("#addPoiAdd").find('span').text('可添加一个拍摄地点');
        $('#addrConfirm').attr('data-currentIndex', $(this).parents('.addr-item').index());
        $('#addrConfirm').attr('data-currentPlaceId', $(this).parents('.addr-item').attr('data-placeId'));
    });
    $('.addr-list').find('.add-after').live('click', function () {
        if ($(this).parents('.addr-item').next('.addr-item').index() == -1) {
            var belong_to = parseInt($(this).parents('.addr-item').attr('data-belongTo'));
            if (belong_to) {
                $("#placeBelongTo").val(belong_to);
                $('#addrConfirm').attr('data-addLocation', $(this).parents(".trip-day").attr("id"));
            } else {
                $('#addrConfirm').attr('data-addLocation', 'addr-list-outer');
            }
            $('#addrPopBox').show();
            $("#addrPopBox").find(".poi").remove();
            $("#editAddrPopBox").find(".poi").remove();
            $("#btnAddPoi").focus();
        } else {
            $('#addrConfirm').attr('data-moreAdd', 1);
            $('#addrPopBox').show();
            $("#addrPopBox").find(".poi").remove();
            $("#editAddrPopBox").find(".poi").remove();
            $("#btnAddPoi").focus();
            $("#addPoiAdd").find('span').text('可添加一个拍摄地点');
            $('#addrConfirm').attr('data-currentIndex', $(this).parents('.addr-item').next('.addr-item').index());
            $('#addrConfirm').attr('data-currentPlaceId', $(this).parents('.addr-item').next('.addr-item').attr('data-placeId'));
        }
    });
    var submitAddPlace = function (currentIndex, currentPlaceId) {
        var poiObj = $('.poi');
        if (parseInt(poiObj.length) <= 0) {
            alert("请添加地点！");
            return false;
        }
        var poiData = {
            place_id: currentPlaceId,
            tid: apiParams['tid'],
            poi_type: poiObj.attr("poi-type"),
            poi_id: poiObj.attr("poi-id"),
            poi_name: poiObj.attr("poi-name"),
            district_id: poiObj.attr("district-id"),
            district_name: poiObj.attr("district-name")
        };
        $.ajax({
            type: 'post', url: apiParams['morePlace'], data: poiData, dataType: "json", success: function (response) {
                if (response['success']) {
                    var place_data = response['data'];
                    var cloneNode = $('#addr_item').clone(true);
                    cloneNode.removeAttr('id');
                    cloneNode.attr('id', 'addr_day_' + place_data['place_id']).show();
                    cloneNode.find('.item-clone').attr('id', 'addr_record_' + place_data['place_id']).addClass('editor-item');
                    cloneNode.attr('data-poiId', poiObj.attr("poi-id"));
                    cloneNode.attr('data-poiType', poiObj.attr("poi-type"));
                    cloneNode.attr('data-poiName', poiObj.attr("poi-name"));
                    cloneNode.attr('data-districtId', poiObj.attr("district-id"));
                    cloneNode.attr('data-districtName', poiObj.attr("district-name"));
                    cloneNode.attr('data-belongTo', place_data['belong_to']);
                    cloneNode.attr('data-placeId', place_data['place_id']);
                    cloneNode.find('.addr-name').text(poiObj.attr("poi-name"));
                    cloneNode.find('.addr-add').hide();
                    cloneNode.find('.addr-title').show();
                    cloneNode.insertBefore("#addr_day_" + currentPlaceId);
                    UM.getEditor('addr_record_' + place_data['place_id']);
                    if (parseInt(place_data['belong_to'])) {
                        refreshTripsPlace(place_data['belong_to']);
                    }
                    resetMoreHandle('inner_place', place_data['belong_to']);
                    resetMoreHandle('outer_place');
                    $("#addrPopBox").hide();
                    initPlaceData();
                } else {
                    alert(response['msg']);
                    return false;
                }
            }
        });
    }
    $('.addr-list').find('.move-before').live('click', function () {
        movePlace($(this), 'up');
    });
    $('.addr-list').find('.move-after').live('click', function () {
        movePlace($(this), 'down');
    });
    function movePlace(currentObj, type) {
        var current_index, move_current_index, error_msg, current_placeId, move_current_placeId;
        var belong_to = currentObj.parents('.addr-item').attr('data-belongTo');
        if (type == 'up') {
            current_index = currentObj.parents('.addr-item').index();
            move_current_index = currentObj.parents('.addr-item').prev('.addr-item').index();
            current_placeId = currentObj.parents('.addr-item').attr('data-placeId');
            move_current_placeId = currentObj.parents('.addr-item').prev('.addr-item').attr('data-placeId');
            error_msg = '第一个地点无法上移！';
        } else if (type == 'down') {
            current_index = currentObj.parents('.addr-item').index();
            move_current_index = currentObj.parents('.addr-item').next('.addr-item').index();
            current_placeId = currentObj.parents('.addr-item').attr('data-placeId');
            move_current_placeId = currentObj.parents('.addr-item').next('.addr-item').attr('data-placeId');
            error_msg = '最后一个地点无法下移！';
        }
        if (move_current_index == -1) {
            alert(error_msg);
            return false;
        } else {
            var places = new Object();
            places = {'place_id': current_placeId, 'move_place_id': move_current_placeId}
            $.ajax({
                type: 'post',
                url: apiParams['movePlace'],
                data: {places: places, tid: apiParams['tid']},
                dataType: "json",
                success: function (response) {
                    if (response['success']) {
                        if (type == 'up') {
                            $("#addr_day_" + current_placeId).insertBefore("#addr_day_" + move_current_placeId);
                        } else {
                            $("#addr_day_" + move_current_placeId).insertBefore("#addr_day_" + current_placeId);
                        }
                        refreshTripsPlace(belong_to);
                        resetMoreHandle('inner_place', belong_to);
                        resetMoreHandle('outer_place');
                    } else {
                        alert(response['msg']);
                    }
                }
            });
        }
    }
};
BlogPublish.prototype.eduiEventBind = function () {
    var self = this;
    $(".edui-body-container").live("focus", function () {
        var $eduiCon = $(this).parents(".edui-container");
        $eduiCon.parent().find(".default-txt").hide();
        $eduiCon.find(".edui-toolbar").removeClass("hide").addClass("show");
        $eduiCon.addClass("box-focus");
    });
    $(".edui-body-container").live("blur", function () {
        var $eduiCon = $(this).parents(".edui-container");
        $eduiCon.removeClass("box-focus");
        $eduiCon.find(".edui-toolbar").removeClass("show").addClass("hide");
        var editor = UM.getEditor($(this).attr("id"));
        if (isEmpty(editor.getContentTxt()) && editor.getContent().indexOf("<img") == -1) {
            $eduiCon.parent().find(".default-txt").show();
        }
    });
};
BlogPublish.prototype.controlEventBind = function () {
    function initTripsDelete(type) {
        if (type == 'tripDeleteConfirm') {
            $("#tripDeleteConfirm").find('.del_sure').attr('data-type', 1);
            $("#currentScheduleId").removeAttr('value');
            $("#scheduleRemoveObj").removeAttr('value');
        }
    }

    $(".trip-control-del").live("click", function () {
        var scheduleObj = $(this).parents('.trip-day');
        $("#currentScheduleId").val(scheduleObj.attr("data-scheduleId"));
        $("#scheduleRemoveObj").val(scheduleObj.attr("id"))
        $("#tripDeleteConfirm").show();
    });
    $(".addr-control-del").live("click", function () {
        var placeObj = $(this).parents('.addr-item');
        $("#currentPlaceId").val(placeObj.attr('data-placeId'));
        $("#placeRemoveObj").val(placeObj.attr('id'));
        $("#addrDeleteConfirm").show();
    });
    $(".delete-confirm").find(".close").live("click", function () {
        $(".delete-confirm").hide();
        initTripsDelete($(this).parents('.delete-confirm').attr('id'));
    });
    $(".poi-popup").find(".close").bind("click", function () {
        $("#addrPopBox").hide();
        $("#editAddrPopBox").hide();
        initPlaceData();
    });
    $(".del_cancle").bind("click", function () {
        $(".delete-confirm").hide();
        initTripsDelete($(this).parents('.delete-confirm').attr('id'));
    });
    $(".del_sure").bind("click", function () {
        var contentType = $(this).attr("data-type");
        var postData;
        var delUrl;
        var removeObj;
        var placeBelongTo;
        if (contentType == 1) {
            var scheduleId = $("#currentScheduleId").val();
            var scheduleRemoveObj = $("#scheduleRemoveObj").val();
            delUrl = apiParams['delSchedule'];
            removeObj = $("#" + scheduleRemoveObj);
            var isNotFinalTrip = (removeObj.siblings().length <= 0) ? true : false;
            postData = {schedule_id: scheduleId, tid: apiParams['tid']};
        } else if (contentType == 2) {
            var currentPlaceId = $("#currentPlaceId").val();
            var placeRemoveObj = $("#placeRemoveObj").val();
            delUrl = apiParams['delPlace'];
            removeObj = $("#" + placeRemoveObj);
            postData = {place_id: currentPlaceId, tid: apiParams['tid']};
            placeBelongTo = parseInt(removeObj.attr("data-belongto"));
        } else {
            return false;
        }
        $.ajax({
            type: 'post', url: delUrl, data: postData, dataType: "json", async: false, success: function (response) {
                if (response['success']) {
                    removeObj.remove();
                    if (contentType == 1) {
                        if (isNotFinalTrip) {
                            $(".delete-confirm").hide();
                            $(".trip-day-next").hide();
                            resetMoreHandle('schedule');
                        } else {
                            adjustDateAndDay();
                        }
                    } else {
                        if (placeBelongTo) {
                            resetMoreHandle('inner_place', placeBelongTo);
                            refreshTripsPlace(placeBelongTo);
                        } else {
                            resetMoreHandle('outer_place');
                        }
                        $(".delete-confirm").hide();
                    }
                } else {
                    alert(response['msg']);
                }
            }
        });
    });
    function adjustDateAndDay() {
        var firstIndexDate;
        var adjustTripsDates = new Object();
        $('.trip-list').find('.trip-day').each(function (n) {
            if (n == 0) {
                firstIndexDate = $(this).find('.trip-time').text();
            }
            if (!isEmpty(firstIndexDate)) {
                var indexDateNew = addDate(firstIndexDate, n);
            } else {
                var indexDateNew = '';
            }
            adjustTripsDates[$(this).attr('data-scheduleId') + '_sid'] = indexDateNew;
        });
        if (!isNullObj(adjustTripsDates)) {
            $.ajax({
                type: 'post',
                url: apiParams['changeDate'],
                data: {tid: apiParams['tid'], dates: adjustTripsDates},
                dataType: "json",
                success: function (response) {
                    $(".draft-save").hide();
                    $(".draft-preview").show();
                    if (response['success']) {
                        var day_num = 1;
                        for (var indexId in adjustTripsDates) {
                            var indexs = indexId.split('_');
                            $("#trip_day_" + indexs[0]).find('.trip-time').text(adjustTripsDates[indexId]);
                            $("#trip_day_" + indexs[0]).find('.day-num').text(day_num);
                            day_num++;
                        }
                        $(".delete-confirm").hide();
                        resetMoreHandle('schedule');
                    }
                }
            });
        } else {
            $(".delete-confirm").hide();
            resetMoreHandle('schedule');
        }
    }
};
BlogPublish.prototype.placeholder = function (ele, defaultTxt, maxLen) {
    var self = this;
    ele.each(function () {
        $(this).keyup(function () {
            self._checkLength(this, maxLen);
        });
        if ($(this).val() == '' || $(this).val() == defaultTxt) {
            $(this).val(defaultTxt).addClass('placeholder');
        }
        $(this).focus(function () {
            var content = $(this).val();
            if (content == defaultTxt) {
                $(this).val('').removeClass('placeholder');
            }
        }).blur(function () {
            if ($(this).val() == '') {
                $(this).val(defaultTxt).addClass('placeholder');
            }
        });
    });
};
BlogPublish.prototype.showPhotoUploadPopBox = function () {
    this.$photoManagerPopBox.css("visibility", "visible");
};
BlogPublish.prototype.hidePhotoUploadPopBox = function () {
    this.$photoManagerPopBox.css("visibility", "hidden");
};
BlogPublish.prototype._checkLength = function (el, maxLen) {
    if (!maxLen) {
        return;
    }
    if (el.value.length > maxLen) {
        el.value = el.value.substring(0, maxLen);
    }
    var curr = el.value.length;
    this.$inputLimit.html(" <em>" + curr + "</em>" + "/" + maxLen);
};
BlogPublish.prototype.lazyloadImg = function () {
    $("img").lazyload({effect: "fadeIn", failurelimit: 80, threshold: 300, skip_invisible: false});
};
BlogPublish.prototype.showBlogGuide = function () {
    $(".ydmain a.next").click(function () {
        $(this).parent().addClass("hide").next().removeClass("hide");
    })
    $(".ydmain a.finish").click(function () {
        $(".guide-popup").hide();
    })
    $(".ydmain a.close").click(function () {
        $(".guide-popup").hide();
    });
    $(".publish-guide").find("a").click(function () {
        $(".guide-popup").show();
        $(".ydfirst").removeClass("hide").siblings().addClass("hide");
    });
};
var BlogPublish = new BlogPublish();
$(function () {
    BlogPublish.init();
});
function resetMoreHandle(type, belong_to) {
    if (type == 'inner_place') {
        if (belong_to) {
            var addrListLength = $("#trip_day_" + belong_to).find('.addr-item').length;
            if (addrListLength == 1) {
                $("#trip_day_" + belong_to).find('.addr-item').eq(0).find('.move-before').hide();
                $("#trip_day_" + belong_to).find('.addr-item').eq(addrListLength - 1).find('.move-after').hide();
            } else {
                $("#trip_day_" + belong_to).find('.addr-item').eq(0).find('.move-before').hide();
                $("#trip_day_" + belong_to).find('.addr-item:gt(0)').find('.move-before').show();
                $("#trip_day_" + belong_to).find('.addr-item').eq(addrListLength - 1).find('.move-after').hide();
                $("#trip_day_" + belong_to).find('.addr-item:lt(' + (addrListLength - 1) + ')').find('.move-after').show();
            }
        }
    } else if (type == 'outer_place') {
        var addrListLengthOuter = $(".addr-list-outer").find('.addr-item').length;
        if (addrListLengthOuter == 1) {
            $(".addr-list-outer").find('.addr-item').eq(0).find('.move-before').hide();
            $(".addr-list-outer").find('.addr-item').eq(addrListLengthOuter - 1).find('.move-after').hide();
        } else {
            $(".addr-list-outer").find('.addr-item').eq(0).find('.move-before').hide();
            $(".addr-list-outer").find('.addr-item:gt(0)').find('.move-before').show();
            $(".addr-list-outer").find('.addr-item').eq(addrListLengthOuter - 1).find('.move-after').hide();
            $(".addr-list-outer").find('.addr-item:lt(' + (addrListLengthOuter - 1) + ')').find('.move-after').show();
        }
    } else if (type == 'schedule') {
        var tripListDayLength = $(".trip-list").find('.trip-day').length;
        if (tripListDayLength == 1) {
            $(".trip-list").find('.trip-day').eq(0).find('.move-before').hide();
            $(".trip-list").find('.trip-day').eq(tripListDayLength - 1).find('.move-after').hide();
        } else if (tripListDayLength > 1) {
            $(".trip-list").find('.trip-day').eq(0).find('.move-before').hide();
            $(".trip-list").find('.trip-day:gt(0)').find('.move-before').show();
            $(".trip-list").find('.trip-day').eq(tripListDayLength - 1).find('.move-after').hide();
            $(".trip-list").find('.trip-day:lt(' + (tripListDayLength - 1) + ')').find('.move-after').show();
        } else if (tripListDayLength < 1) {
            $('.trip-day-next').hide();
        }
    }
}
function refreshTripsPlace(schedule_id) {
    var schedule_id = parseInt(schedule_id);
    if (!schedule_id) {
        return false;
    }
    var trips_place_list = '';
    var trips_place_list_length = $("#trip_day_" + schedule_id).find('.addr-item').length;
    if (trips_place_list_length) {
        $("#trip_day_" + schedule_id).find('.addr-item').each(function (index) {
            var poi_type = $(this).attr('data-poiType');
            var poi_name = $(this).attr("data-poiName");
            var place_icon = '';
            var blank_icon = '';
            if (poi_type == 1) {
                place_icon = '<i class="type-icon type-diqu"></i>';
            } else {
                place_icon = '<i class="type-icon type-jingdian"></i>';
            }
            if (index < (trips_place_list_length - 1)) {
                blank_icon = '&gt;';
            }
            trips_place_list += '<span class="trip-addr-item">' + place_icon + '<em>' + poi_name + '</em></span>' + blank_icon;
        });
    } else {
        $("#trip_day_" + schedule_id).find('.schedule-addr-add').show();
        $("#trip_day_" + schedule_id).find('.addr-add-more').hide();
        var scheduleEndEditor = UM.getEditor('trip_end_' + schedule_id);
        if (isEmpty(scheduleEndEditor.getContentTxt()) && scheduleEndEditor.getContent().indexOf("<img") == -1) {
            $("#trip_day_" + schedule_id).find('.trip-end').hide();
        }
    }
    if (schedule_id) {
        $("#trip_place_list_" + schedule_id).html(trips_place_list);
    }
}
function initPlaceData() {
    $("#addPoiAdd").show();
    $("#addPoiAdd").find('span').text('可添加多个拍摄地点');
    $('#placeBelongTo').val(0);
    $("#addrConfirm").attr('data-addLocation', 'addr-list-outer').attr('data-moreAdd', 0).removeAttr("data-currentIndex").removeAttr("data-currentPlaceId");
}
function addDate(schedule_date, days) {
    var dateArray = schedule_date.split('-');
    if (dateArray.length == 3) {
        var d = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        d.setDate(d.getDate() + days);
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day = d.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        return d.getFullYear() + '-' + month + '-' + day;
    } else {
        return '';
    }
};
function isNullObj(obj) {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}
function compareDate(dateValue) {
    if (dateValue) {
        var nowDateObj = new Date();
        var nowDate = nowDateObj.getFullYear() + "-" + (nowDateObj.getMonth() + 1) + "-" + nowDateObj.getDate();
        if (Date.parse(nowDate.replace(/-/g, "/")) - Date.parse(dateValue.replace(/-/g, "/")) < 0) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
