

cc.Class({
    extends: cc.Component,

    properties: {
        btn_back: cc.Button,

    },

    gotoBack: function() {
        cc.director.loadScene("helloworld");
    }
})