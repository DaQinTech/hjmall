var o = require("../../../api.js"), e = getApp();

Page({
    data: {
        page_img: {
            bg: e.webRoot + "/statics/images/fxhb/bg.png",
            close: e.webRoot + "/statics/images/fxhb/close.png",
            hongbao_bg: e.webRoot + "/statics/images/fxhb/hongbao_bg.png",
            open_hongbao_btn: e.webRoot + "/statics/images/fxhb/open_hongbao_btn.png"
        }
    },
    onLoad: function(t) {
        var a = this;
        e.pageOnLoad(this), wx.showLoading({
            title: "加载中",
            mask: !0
        }), e.request({
            url: o.fxhb.open,
            success: function(o) {
                wx.hideLoading(), 0 == o.code && (o.data.hongbao_id ? wx.redirectTo({
                    url: "/pages/fxhb/detail/detail?id=" + o.data.hongbao_id
                }) : a.setData(o.data)), 1 == o.code && wx.showModal({
                    content: o.msg,
                    showCancel: !1,
                    success: function(o) {
                        o.confirm && wx.redirectTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    },
    onReady: function() {
        e.pageOnReady(this);
    },
    onShow: function() {
        e.pageOnShow(this);
    },
    showRule: function() {
        this.setData({
            showRule: !0
        });
    },
    closeRule: function() {
        this.setData({
            showRule: !1
        });
    },
    openHongbao: function(t) {
        console.log(t);
        wx.showLoading({
            title: "抢红包中",
            mask: !0
        }), e.request({
            url: o.fxhb.open_submit,
            method: "post",
            data: {
                form_id: t.detail.formId
            },
            success: function(o) {
                0 == o.code ? wx.redirectTo({
                    url: "/pages/fxhb/detail/detail?id=" + o.data.hongbao_id
                }) : (wx.hideLoading(), wx.showModal({
                    content: o.msg,
                    showCancel: !1
                }));
            }
        });
    }
});