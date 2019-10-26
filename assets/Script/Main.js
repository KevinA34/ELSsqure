// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// var square = require("Square");

cc.Class({
    extends: cc.Component,

    properties: {
        pNode : cc.Layout,
        lb_score: cc.Label,
        lb_time: cc.Label,
        nextSq: null,
        bg_sqNext: cc.Layout,
        sqBase_prefab: {
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
        this.randomSqNext();
    },

    randomSqNext: function() {
        if (!this.nextSq) {
            this.nextSq = cc.instantiate(this.sqBase_prefab);
            this.bg_sqNext.node.addChild(this.nextSq);
        }
        var type = Math.floor(Math.random() * 7) + 1;
        var dir = Math.floor(Math.random() * 3);
        this.nextSq.getComponent("SquareBase").setDataAndDir(type, dir);
    },

    initPNode: function(s_prefab) {
        this.actSqPre = cc.instantiate(this.sqBase_prefab);
        this.pNode.node.addChild(this.actSqPre);

        this.actSqPre.x = 200;
        this.actSqPre.y = 300;


        var pos = this.pNode.node.getPosition();
        console.log('------- x : ' + pos.x);
        console.log('------- y : ' + pos.y);

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
