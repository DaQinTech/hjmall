require("../../../api.js");
var n = getApp();
Page({
    data: {},
    onLoad: function(o) {
        n.pageOnLoad(this)
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