// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        pNode : cc.Layout,
        lb_score: cc.Label,
        lb_time: cc.Label,
        squre_prefab: {
            default: null,
            type: cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var that = this;
        this.timeCnt = 0;
        this.lb_scoreCnt = 0;
        this.lb_time.schedule(function() {
            that.timeCnt += 1;
            that.lb_time.string = "时间：" + that.timeCnt;
        }, 1);
        this.initPNode();
    },

    initPNode: function() {
        this.pNode;
        console.log('-----' + this.pNode.node.getPosition().x);
        
    },

    addTotalScore: function (addScore) {
        this.lb_scoreCnt += addScore;
        this.lb_score.string = "得分：" + this.lb_scoreCnt;
    },

    start () {

    },

    update (dt) {


    },
    onDetory() {

    },
});
