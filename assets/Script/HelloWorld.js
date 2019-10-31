var packageS = require("proto");
var mytestpackage = packageS.mytestpackage;

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
        var that = this;
        this.label.string = this.text;

        var message = mytestpackage.testRequest.create({id:1, name: "my first protoBuf example"})
        var buffer = mytestpackage.testRequest.encode(message).finish();
        this.scheduleOnce(function() {
            var desc = mytestpackage.testRequest.decode(buffer);
            console.log('------');
            console.log(JSON.stringify(desc));
            that.label.string = desc.name;
        }, 1);
    },

    showGameScene: function() {
        cc.director.loadScene("main");
    },

    // called every frame
    // update: function (dt) {

    // },
});
