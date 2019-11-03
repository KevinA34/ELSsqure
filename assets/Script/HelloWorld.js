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
        },
        sp_skeleton: {
            default: null,
            type: sp.Skeleton
        }
    },

    // use this for initialization
    onLoad: function () {

        this.exampleProto();

        this.loadResFunc();
    },

    loadResFunc: function() {
        this.exampleSpriteFrame();
        // this.playBgMusic();
        this.skeletonFunc();
    },
    /**
     * 骨骼动画播放
     */
    skeletonFunc: function() {
        // 固定skeleton 播放
        var dragonDisplay =  this.sp_skeleton.node.getComponent(sp.Skeleton);
        dragonDisplay.clearTracks();
        dragonDisplay.addAnimation(0, "animation", false);
        
        // 动态skeleton 播放
        let dragonDisplay2 = new cc.Node("spineNode");
        dragonDisplay2.addComponent(sp.Skeleton);
        dragonDisplay2.parent = cc.find("Canvas");
        cc.loader.loadRes("skeletons/qf_dajidali01/qf_dajidali01.atlas", sp.SkeletonData, function(err, spine) {
            if (err) {
                cc.log(err.message);
                return;
            }
            let ske = dragonDisplay2.getComponent(sp.Skeleton);
            ske.skeletonData = spine;
            ske.setAnimation(0, "animation", true);
        })

        // // 远程获取骨骼动画资源并加载
        // this.scheduleOnce(function() {
        //     let image = "http://192.168.199.199:8080/skeletons/qf_caishen01/qf_caishen01.png";
        //     let skeJson = "http://192.168.199.199:8080/skeletons/qf_caishen01/qf_caishen01.json";
        //     let atlas = "http://192.168.199.199:8080/skeletons/qf_caishen01/qf_caishen01.atlas";
        //     cc.loader.load(image, (error, imageData) => {
        //         cc.loader.load({url:atlas, type: 'txt'}, function(error, atlasData) {
        //             cc.loader.load({url:skeJson, type:'txt'},(error, skeJsonData)=>{
        //                 let newAtlas = new dragonBones.DragonBonesAtlasAsset();
        //                 newAtlas.atlasJson = atlasData;
        //                 newAtlas.texture = imageData;

        //                 let asset = new dragonBones.DragonBonesAsset();
        //                 asset.dragonBonesJson = skeJsonData;
    
        //                 dragonDisplay2.dragonAtlasAsset = newAtlas;
        //                 dragonDisplay2.dragonAsset = asset;
                        
        //                 dragonDisplay2.armatureName = "animation";
        //                 dragonDisplay2.addAnimation("animation", 0)
        //             })
        //         })
        //     })
        // }, 5);
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
