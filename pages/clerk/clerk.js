var e = require("../../api.js"), o = getApp();

Page({
    data: {
        order: null,
        getGoodsTotalPrice: function() {
            return this.data.order.total_price;
        }
    },
    onLoad: function(t) {
        o.pageOnLoad(this);
        var r = this;
        r.setData({
            store: wx.getStorageSync("store"),
            user_info: wx.getStorageSync("user_info")
        }), wx.showLoading({
            title: "正在加载"
        }), o.request({
            url: e.order.clerk_detail,
            data: {
                order_no: t.scene
            },
            success: function(e) {
                0 == e.code ? r.setData({
                    order: e.data
                }) : wx.showModal({
                    title: "警告！",
                    showCancel: !1,
                    content: "订单不存在",
                    confirmText: "确认",
                    success: function(e) {
                        e.confirm && wx.redirectTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            },
            complete: function() {
                wx.hideLoading();
            }
        });
    },
    clerk: function(t) {
        var r = this;
        console.log(r.data.order), wx.showModal({
            title: "提示",
            content: "是否确认核销？",
            success: function(t) {
                t.confirm ? (wx.showLoading({
                    title: "正在加载"
                }), o.request({
                    url: e.order.clerk,
                    data: {
                        order_no: r.data.order.order_no
                    },
                    success: function(e) {
                        0 == e.code ? wx.redirectTo({
                            url: "/pages/user/user"
                        }) : wx.showModal({
                            title: "警告！",
                            showCancel: !1,
                            content: e.msg,
                            confirmText: "确认",
                            success: function(e) {
                                e.confirm && wx.redirectTo({
                                    url: "/pages/index/index"
                                });
                            }
                        });
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                })) : t.cancel;
            }
        });
    }
});