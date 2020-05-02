import { timingSafeEqual } from "crypto";


cc.Class({
    extends: cc.Component,

    properties: {
        btn_back: cc.Button,

        cock_0: {
            default: null,
            type: cc.Layout
        },

        cock_1: {
            default: null,
            type: cc.Layout
        },

    },
    
    onLoad: function() {
        var self = this;

        this.scheduleOnce(function() {
            var ji1Map = {
                id: Math.floor(Math.random() * 4) + 1,
                weight: Math.random() * 2 + 4
            }
            var cockJS = self.cock_0.getComponent("CockSprite");
            if (cockJS) {
                console.log("------  ji1: initCock");
                cockJS.initCock(ji1Map, self);
            } else {
                console.log("--------11111  ji1  error");
            }
    
            var ji2Map = {
                id: Math.floor(Math.random() * 4) + 1,
                weight: Math.random() * 2 + 4
            }
            var cockJS = self.cock_1.getComponent("CockSprite");
            if (cockJS) {
                console.log("------  ji2: initCock");
                cockJS.initCock(ji2Map, self);

                // self.startFight();
            } else {
                console.log("--------22222 =  ji2 error");
            }
        }, 1)

    },

    startFight: function() {
        var self = this;

        console.log("-------startFight" + startFight);
        var fightData = self.getFightData(Mathf.floor(Math.random()));

        var fightRounds = fightData.fight;

        console.log("-------fightData" + JSON.stringify(fightData));

        var roundIndex = 0;
        return;
        var roundFight = function() {
            var roundData = fightRounds[roundIndex];
            console.log("----------roundIndex: " + roundIndex);
            console.log("----------roundData: " + roundData);
            roundIndex ++;
            var cockJS1 = self.cock_1.getComponent("CockSprite");
            cockJS1.playAttack();

            var cockJS2 = self.cock_2.getComponent("CockSprite");
            cockJS2.playAttack();

            if (roundIndex < fightRounds.length) {
                roundFight();
            }

        }
        roundFight();
    },

    // update: function() {
    //     // 
    // },

    gotoBack: function() {
        cc.director.loadScene("mainScene");
    },

    startCockFight: function() {

    },

    getFightData : function (winIndex) {
        console.log('------------------winIndex' + winIndex);
        var data = {winIndex: winIndex}
        // 战斗数据
        var skillhurt = [4, 7, 10] //基础数值，上下浮动 1-2
        // 获取每轮的伤害值
        function getHurt() {
            var percent = Math.floor(Math.random() * 10)
            var hurt = Math.floor(Math.random() * 3)
            var skill = 0;
            if (percent < 2) {        //20%概率
                hurt += skillhurt[2]
                skill = 2
            } else if (percent <= 5) { //40%概率
                hurt += skillhurt[1]
                skill = 1
            } else {                  //40%概率
                hurt += skillhurt[0]
                skill = 0
            }
            return {hurt: hurt, skill: skill}
        }
    
        // 局数
        data.round = 1
        var tmp0 = [{hp: 100}]
        var tmp1 = [{hp: 100}]
        while (tmp0[tmp0.length - 1].hp > 0 && tmp1[tmp1.length - 1].hp > 0) {
            var tmpHurt0 = getHurt()
            var tmpHurt1 = getHurt()
            // 第一只鸡
            tmpHurt0.hp = tmp0[data.round - 1].hp - tmpHurt1.hurt
            tmpHurt0.hp = Math.max(0, tmpHurt0.hp)
            tmp0.push(tmpHurt0)
            // 第二只鸡
            tmpHurt1.hp = tmp1[data.round - 1].hp - tmpHurt0.hurt
            tmpHurt1.hp = Math.max(0, tmpHurt1.hp)
            tmp1.push(tmpHurt1)
            data.round++;
        }
    
        data.fight = []
        // 两只鸡平手，都挂了
        if (tmp0[tmp0.length - 1].hp == 0 && tmp1[tmp1.length - 1].hp == 0) {
            return getFightData(winIndex)
        }
    
        // 计算那只鸡获胜
        if (tmp0[tmp0.length - 1].hp == 0) {
            data.fight[winIndex] = tmp1
            data.fight[(winIndex + 1) % 2] = tmp0
        } else {
            data.fight[winIndex] = tmp0
            data.fight[(winIndex + 1) % 2] = tmp1
        }
        return data
    }, 
})