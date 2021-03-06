var t = require("../../../api.js"),
    e = getApp();
Page({
    data: {
        status: 1,
        show_menu: false,
        order_list: [],
        no_orders: !1,
        no_more_orders: !1
    },
    onLoad: function(t) {
        e.pageOnLoad(this);
        var a = this;
        debugger;
        a.setData({
            status: parseInt(t.status || 1),
            loading_more: !0
        }), a.loadOrderList(function() {
            a.setData({
                loading_more: !1
            })
        })
    },
    onReady: function() {
        e.pageOnReady(this)
    },
    onShow: function() {
        e.pageOnShow(this)
    },
    onHide: function() {
        e.pageOnHide(this)
    },
    onUnload: function() {
        e.pageOnUnload(this)
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    showMenu: function(t) {
        var e = this;
        e.setData({
            show_menu: !e.data.show_menu
        })
    },
    loadOrderList: function(a) {
        var o = this,
            s = o.data.status,
            n = (o.data.current_page || 0) + 1,
            r = o.data.keyword || "";
        e.request({
            url: t.mch.order.list,
            data: {
                status: s,
                page: n,
                keyword: r
            },
            success: function(t) {
                0 == t.code && (1 != n || t.data.list && t.data.list.length || o.setData({
                    no_orders: !0
                }), t.data.list && t.data.list.length ? (o.data.order_list = o.data.order_list || [], o.data.order_list = o.data.order_list.concat(t.data.list), o.setData({
                    order_list: o.data.order_list,
                    current_page: n
                })) : o.setData({
                    no_more_orders: !0
                }))
            },
            complete: function() {
                "function" == typeof a && a()
            }
        })
    },
    showSendModal: function(t) {
        this.setData({
            show_send_modal: !0,
            send_type: "express",
            order_index: t.currentTarget.dataset.index
        })
    },
    hideSendModal: function() {
        this.setData({
            show_send_modal: !1
        })
    },
    switchSendType: function(t) {
        var e = this,
            a = t.currentTarget.dataset.type;
        e.setData({
            send_type: a
        })
    },
    sendSubmit: function() {
        var a = this;
        if ("express" == a.data.send_type) return a.hideSendModal(), void wx.navigateTo({
            url: "/mch/m/order-send/order-send?id=" + a.data.order_list[a.data.order_index].id
        });
        wx.showModal({
            title: "提示",
            content: "无需物流方式订单将直接标记成已发货，确认操作？",
            success: function(o) {
                o.confirm && (wx.showLoading({
                    title: "正在提交",
                    mask: !0
                }), e.request({
                    url: t.mch.order.send,
                    method: "post",
                    data: {
                        send_type: "none",
                        order_id: a.data.order_list[a.data.order_index].id
                    },
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: t.msg,
                            success: function(e) {
                                e.confirm && 0 == t.code && wx.redirectTo({
                                    url: "/mch/m/order/order?status=2"
                                })
                            }
                        })
                    },
                    complete: function() {
                        wx.hideLoading({
                            title: "正在提交",
                            mask: !0
                        })
                    }
                }))
            }
        })
    },
    showPicList: function(t) {
        var e = this;
        wx.previewImage({
            urls: e.data.order_list[t.currentTarget.dataset.index].pic_list,
            current: e.data.order_list[t.currentTarget.dataset.index].pic_list[t.currentTarget.dataset.pindex]
        })
    },
    refundPass: function(a) {
        var o = this,
            s = a.currentTarget.dataset.index,
            n = o.data.order_list[s].id,
            r = o.data.order_list[s].type;
        wx.showModal({
            title: "提示",
            content: "确认同意" + (1 == r ? "退款？资金将原路返回！" : "换货？"),
            success: function(a) {
                a.confirm && (wx.showLoading({
                    title: "正在处理",
                    mask: !0
                }), e.request({
                    url: t.mch.order.refund,
                    method: "post",
                    data: {
                        id: n,
                        action: "pass"
                    },
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: t.msg,
                            showCancel: !1,
                            success: function(t) {
                                wx.redirectTo({
                                    url: "/" + o.route + "?" + getApp().utils.objectToUrlParams(o.options)
                                })
                            }
                        })
                    },
                    complete: function() {
                        wx.hideLoading()
                    }
                }))
            }
        })
    },
    refundDeny: function(a) {
        var o = this,
            s = a.currentTarget.dataset.index,
            n = o.data.order_list[s].id;
        o.data.order_list[s].type;
        wx.showModal({
            title: "提示",
            content: "确认拒绝？",
            success: function(a) {
                a.confirm && (wx.showLoading({
                    title: "正在处理",
                    mask: !0
                }), e.request({
                    url: t.mch.order.refund,
                    method: "post",
                    data: {
                        id: n,
                        action: "deny"
                    },
                    success: function(t) {
                        wx.showModal({
                            title: "提示",
                            content: t.msg,
                            showCancel: !1,
                            success: function(t) {
                                wx.redirectTo({
                                    url: "/" + o.route + "?" + getApp().utils.objectToUrlParams(o.options)
                                })
                            }
                        })
                    },
                    complete: function() {
                        wx.hideLoading()
                    }
                }))
            }
        })
    }
});