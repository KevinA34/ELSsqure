cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: '欢迎来到我的俄罗斯方块游戏',
        btn_start: cc.Button,
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        
    },

    showGameScene: function() {
        cc.director.loadScene("main");
    },

    // called every frame
    update: function (dt) {

    },
});
