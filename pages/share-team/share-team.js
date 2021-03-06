var t = require("../../api.js"), a = getApp(), s = !1, n = !1, e = 2;

Page({
    data: {
        status: 1,
        first_count: 0,
        second_count: 0,
        third_count: 0,
        list: Array,
        no_more: !1
    },
    onLoad: function(t) {
        a.pageOnLoad(this);
        var o = this, i = wx.getStorageSync("share_setting");
        o.setData({
            share_setting: i
        }), n = !1, s = !1, e = 2, o.GetList(t.status || 1);
    },
    GetList: function(e) {
        var o = this;
        n || (n = !0, o.setData({
            status: parseInt(e || 1)
        }), wx.showLoading({
            title: "正在加载",
            mask: !0
        }), a.request({
            url: t.share.get_team,
            data: {
                status: o.data.status,
                page: 1
            },
            success: function(t) {
                o.setData({
                    first_count: t.data.first,
                    second_count: t.data.second,
                    third_count: t.data.third,
                    list: t.data.list
                }), 0 == t.data.list.length && (s = !0, o.setData({
                    no_more: !0
                }));
            },
            complete: function() {
                wx.hideLoading(), n = !1;
            }
        }));
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        s || this.loadData();
    },
    loadData: function() {
        if (!n) {
            n = !0;
            var o = this;
            wx.showLoading({
                title: "正在加载",
                mask: !0
            }), a.request({
                url: t.share.get_team,
                data: {
                    status: o.data.status,
                    page: e
                },
                success: function(t) {
                    o.setData({
                        first_count: t.data.first,
                        second_count: t.data.second,
                        third_count: t.data.third,
                        list: o.data.list.concat(t.data.list)
                    }), 0 == t.data.list.length && (s = !0, o.setData({
                        no_more: !0
                    }));
                },
                complete: function() {
                    wx.hideLoading(), n = !1, e++;
                }
            });
        }
    }
});