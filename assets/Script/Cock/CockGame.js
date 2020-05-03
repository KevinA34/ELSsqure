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

        btn_fight: cc.Button,

        lay_test: cc.Layout,

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
            } else {
                console.log("--------22222 =  ji2 error");
            }
        }, 1)

        self.beginIndex = 0;
        cc.director.on("beginFight", function() {
            self.beginIndex++;
            console.log("------------beginIndex : " + self.beginIndex);
            if (self.beginIndex >= 2) {
                self.startCockFight(Math.floor(Math.random() * 2));
            }
        });

    },

    endFight: function() {
        var self = this;
        console.log("-------------endFight");
        self.btn_fight.node.active = true;
        self.lay_test.node.active = true;
    },

    startCockFight: function() {
        var self = this;

        self.btn_fight.node.active = false;
        self.lay_test.node.active = false;


        if (!self.cock_0 || !self.cock_1) {
            return;
        }
        var fightData = self.getFightData(Math.floor(Math.random()));
        var fightRounds = fightData.fight;
        console.log("-------fightData" + JSON.stringify(fightData));

        var cock0_fight = fightRounds[0];
        var cock1_fight = fightRounds[1];
        var totalRounds = fightRounds[0].length;
        console.log("----------totalRound: " + totalRounds);

        var nowRdIndex = 0;
        var roundFight = function() {
            console.log("----------nowRdIndex: " + JSON.stringify(nowRdIndex));
            var finishNum = 0;
            var allFinish = function() {
                finishNum++;
                if (finishNum >= 2) {
                    roundFight();
                }
            }
            var cock0Round = cock0_fight[nowRdIndex];
            var cock1Round = cock1_fight[nowRdIndex];
            nowRdIndex ++;
            var cockJS0 = self.cock_0.getComponent("CockSprite");
            if (cock0Round.skill != null) {
                cockJS0.playAttack(null, cock0Round.skill, function() {      
                    if (nowRdIndex == totalRounds) {
                        if (cock0Round.hp > 0) {
                            cockJS0.playWin(self.endFight.bind(self));
                        } else {
                            cockJS0.playLose();
                        }
                    } else {
                        allFinish();
                    }   
                });
            } else {
                cockJS0.playRun();
            }
            var cockJS1 = self.cock_1.getComponent("CockSprite");
            if (cock1Round.skill != null) {
                cockJS1.playAttack(null, cock1Round.skill, function() {
                    if (nowRdIndex == totalRounds) {
                        if (cock1Round.hp > 0) {
                            cockJS1.playWin(self.endFight.bind(self));
                        } else {
                            cockJS1.playLose();
                        }
                    } else {
                        allFinish();
                    }
                });
            } else {
                cockJS1.playRun(function() {
                    allFinish();
                });
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
            return this.getFightData(winIndex);
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