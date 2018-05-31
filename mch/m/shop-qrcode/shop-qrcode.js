var o = require("../../../api.js"),
    n = getApp();
Page({
    data: {
        qrcode_pic: ""
    },
    onLoad: function(e) {
        n.pageOnLoad(this);
        var a = this;
        n.request({
            url: o.mch.user.shop_qrcode,
            success: function(o) {
                0 == o.code ? a.setData({
                    header_bg: o.data.header_bg,
                    shop_logo: o.data.shop_logo,
                    shop_name: o.data.shop_name,
                    qrcode_pic: o.data.qrcode_pic
                }) : wx.showModal({
                    title: "提示",
                    content: o.msg,
                    success: function() {}
                })
            }
        })
    },
    onReady: function() {
        n.pageOnReady(this)
    },
    onShow: function() {
        n.pageOnShow(this)
    },
    onHide: function() {
        n.pageOnHide(this)
    },
    onUnload: function() {
        n.pageOnUnload(this)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});