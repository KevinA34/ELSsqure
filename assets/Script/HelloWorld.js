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
        hw_interval: 1,
        timeCount: 0,
    },

    // use this for initialization
    onLoad: function () {
        var that = this;
        this.label.string = this.text;

        this.exampleProto();

        this.exampleSpriteFrame();
        
    },
    exampleProto: function() {
        var message = mytestpackage.testRequest.create({id:1, name: "my first protoBuf example"})
        var buffer = mytestpackage.testRequest.encode(message).finish();
        this.scheduleOnce(function() {
            var desc = mytestpackage.testRequest.decode(buffer);
            console.log('------');
            console.log(JSON.stringify(desc));
            that.label.string = desc.name;
        }, 1);
    },
    exampleSpriteFrame: function() {
        var cocos = this.node.getChildByName("cocos");
        cocos.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/helloworld/snow.png"));
        
        var myImage = cc.find("Canvas/myImage").getComponent(cc.Sprite);
        cc.loader.loadRes("helloworld/table.png", cc.SpriteFrame, function(err, spFrame) {
            // myImage.spriteFrame = new cc.SpriteFrame(spFrame);
            myImage.spriteFrame = spFrame;
        })
    },

    showGameScene: function() {
        cc.director.loadScene("main");
    },

    // called every frame
    update: function (dt) {
        this.timeCount += dt;
        if (this.timeCount < this.hw_interval) {
            return;
        }
        this.timeCount = 0;
        console.log('-----in update');

    },
});
