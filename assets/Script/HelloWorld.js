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
        bg_muisc: {
            default: null,
            type: cc.AudioClip,
        }
    },

    // use this for initialization
    onLoad: function () {

        this.exampleProto();

        this.loadResFunc();
    },

    loadResFunc: function() {
        this.exampleSpriteFrame();
        this.playBgMusic();
    },
    /**
     * 声音加载
     */
    playBgMusic: function() {
        cc.audioEngine.playMusic(this.bg_muisc, true);
        // 动态加载
        cc.loader.loadRes("voices/audio/niu.mp3", cc.AudioClip, function(err, voice) {
            cc.audioEngine.playMusic(voice, true);
        });
    },

    exampleProto: function() {
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

    /**
     * 图片加载
     */
    exampleSpriteFrame: function() {
        var cocos = this.node.getChildByName("cocos");
        cocos.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/helloworld/snow.png"));
        
        var myImage = cc.find("Canvas/myImage").getComponent(cc.Sprite);
        cc.loader.loadRes("helloworld/table.png", cc.SpriteFrame, function(err, spFrame) {
            // myImage.spriteFrame = new cc.SpriteFrame(spFrame);
            myImage.spriteFrame = spFrame;
        })

        var myImage2 = cc.find("Canvas/myImage2").getComponent(cc.Sprite);
        this.scheduleOnce(function() {
            cc.loader.loadRes("plists/cards.plist", cc.SpriteAtlas, function(err, atlas) {
                // 方法一  通过数组加载
                // myImage2.spriteFrame = atlas.getSpriteFrames()[0];
                // 方法二  通过名字加载
                myImage2.spriteFrame = atlas.getSpriteFrame("bug_orange_1");
            });
        }, 3);
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
