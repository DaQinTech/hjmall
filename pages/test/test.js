require("../../api.js");

var n = getApp();

Page({
    data: {},
    formSubmit: function(o) {
        console.log(o), n.saveFormId(o.detail.formId);
    },
    onLoad: function(n) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    send: function() {
        n.request({
            url: "http://cje.tunnel.qydev.com/we7offical/addons/zjhj_mall/core/web/index.php?store_id=1&r=api/user/test",
            success: function(n) {
                console.log(11);
            }
        });
    }
});