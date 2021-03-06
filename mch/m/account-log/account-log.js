var t = require("../../../api.js"),
    a = getApp();
Page({
    data: {
        list: [],
        current_page: 0,
        loading: !1,
        no_more: !1
    },
    getList: function() {
        var n = this;
        if (!n.data.loading && !n.data.no_more) {
            n.setData({
                loading: !0
            });
            var e = n.data.current_page + 1;
            a.request({
                url: t.mch.user.account_log,
                data: {
                    page: e,
                    year: "",
                    month: ""
                },
                success: function(t) {
                    0 == t.code && (t.data.list && t.data.list.length ? (n.data.list = n.data.list.concat(t.data.list), n.setData({
                        list: n.data.list,
                        current_page: e
                    })) : n.setData({
                        no_more: !0
                    })), 1 == t.code && wx.showModal({
                        title: "提示",
                        content: t.msg,
                        showCancel: !1
                    })
                },
                complete: function(t) {
                    n.setData({
                        loading: !1
                    })
                }
            })
        }
    },
    onLoad: function(t) {
        a.pageOnLoad(this);
        this.getList()
    },
    onReady: function() {
        a.pageOnReady(this)
    },
    onShow: function() {
        a.pageOnShow(this)
    },
    onHide: function() {
        a.pageOnHide(this)
    },
    onUnload: function() {
        a.pageOnUnload(this)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.getList()
    }
});