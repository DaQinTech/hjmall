var e = require("../../api.js"), t = getApp();

Page({
    data: {
        qrcode: ""
    },
    onLoad: function(o) {
        t.pageOnLoad(this);
        var n = this, a = wx.getStorageSync("share_setting");
        n.setData({
            qrcode: a.qrcode_bg
        }), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), t.request({
            url: e.share.get_qrcode,
            success: function(e) {
                0 == e.code ? n.setData({
                    qrcode: e.data
                }) : wx.showModal({
                    title: "提示",
                    content: e.msg,
                    showCancel: !1
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    onReady: function() {},
    onShow: function() {
        var e = wx.getStorageSync("user_info");
        this.setData({
            user_info: e
        });
    },
    click: function() {
        var e = this;
        wx.previewImage({
            current: e.data.qrcode,
            urls: [ e.data.qrcode ]
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});