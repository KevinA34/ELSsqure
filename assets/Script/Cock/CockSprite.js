import { timingSafeEqual } from "crypto";

cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
        weight: 0,
        timeScale: 0,
        idType: 0,
        hp: 100,

        sp_cock: {
            default: null,
            type: sp.Skeleton
        },

        proBar: {
            default: null,
            type: cc.ProgressBar
        },

        lb_hp: cc.Label,

    },

    onLoad: function() {
        this.lb_hp.string = 100;
        console.log("----------CockSprite  onLoad ");
    },

    initCock: function(info, _parent) {
        console.log("-------cockinfo: " + JSON.stringify(info));
        var self = this;
        self.lb_hp.string = 100;
        self.hp = 100;
        self._parent = _parent;
        self.id = info.id;
        self.animNames = {
            1: [
                "ji1_bp", // 奔跑
                "ji1_dj", // 待机
                "ji1_xx", // 休闲
                "ji1_gj_1", // 攻击动作1  向前跳跃飞扑
                "ji1_gj_3", // 攻击动作3  使用喙部猛啄对手
                "ji1_gj_2", // 攻击动作2  跳起来用左爪子攻击对
                "ji1_sb", // 失败
                "ji1_sl", // 胜利
                "ji1_xz", // 选中
            ],
            2: [
                "ji2_bp", // 奔跑
                "ji2_dj", // 待机
                "ji2_xx", // 休闲
                "ji1_gj1", // 攻击动作1  向前跳跃飞扑
                "ji2_gj3", // 攻击动作3  使用喙部猛啄对手
                "ji1_gj2", // 攻击动作2  跳起来用左爪子攻击对
                "ji3_sb", // 失败
                "ji2_sl", // 胜利
                "ji2_xz", // 选中
            ],
            3: [
                "ji3_bp", // 奔跑
                "ji3_dj", // 待机
                "ji3_xx", // 休闲
                "ji3_gj1", // 攻击动作1  向前跳跃飞扑
                "ji3_gj3", // 攻击动作3  使用喙部猛啄对手
                "ji3_gj2", // 攻击动作2  跳起来用左爪子攻击对
                "ji3_sb", // 失败
                "ji3_sl", // 胜利
                "ji3_xz", // 选中
            ],
            4: [
                "ji4_bp", // 奔跑
                "ji4_dj", // 待机
                "ji4_xx", // 休闲
                "ji4_gj1", // 攻击动作1  向前跳跃飞扑
                "ji4_gj3", // 攻击动作3  使用喙部猛啄对手
                "ji4_gj2", // 攻击动作2  跳起来用左爪子攻击对
                "ji4_sb", // 失败
                "ji4_sl", // 胜利
                "ji4_xz", // 选中
            ],
        }
        self.setBloodProgress(0);
        // info.id = 4;
        try {
            console.log("cock/animations/ji" + info.id + "/ji" + info.id + ".atlas");
            cc.loader.loadRes("cock/animations/ji" + info.id + "/ji" + info.id, sp.SkeletonData, function(err, spine) {
                if (err) {
                    console.log('err : ' + JSON.stringify(err));
                    return;
                }
                if (cc.isValid(self.sp_cock)) {
                    var sp_ske = self.sp_cock.getComponent(sp.Skeleton);
                    sp_ske.skeletonData = spine;
                    self.playWait();
                    cc.director.emit("showCock", self.idType);
                    cc.director.emit("beginFight");
                }
            })
        } catch(e) {
            console.log('------------initCock error');
        }
    },

    setBloodProgress: function(hurt) {
        var self = this;
        self.hp -= hurt;
        self.hp = Math.max(0, self.hp);
        self.lb_hp.string = self.hp;
        self.proBar.getComponent(cc.ProgressBar).progress = self.hp / 100;
    },

    changeCock: function() {
        var self = this;
        var info = {};
        info.id = 4;
        try {
            cc.loader.loadRes("cock/animations/ji" + info.id + "/ji" + info.id, sp.SkeletonData, function(err, spine) {
                if (err) {
                    console.log('err : ' + JSON.stringify(err));
                    return;
                }
                console.log(typeof spine);
                var sp_ske = self.sp_cock.getComponent(sp.Skeleton);
                self.id = info.id;
                sp_ske.skeletonData = spine;
                self.playWait();
            })
        } catch(e) {
            console.log('------------initCock error');
        }
    },


    playRun: function(btn, cb) {
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        sp_ske.setAnimation(0, this.animNames[this.id][0], true);
        sp_ske.timeScale = this.timeScale;
        sp_ske.setCompleteListener(function() {
            console.log('------wancheng playRun')    ;
            if (cb) cb();
        })
    },

    playWait: function() {
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        // sp_ske.clearTrack();
        var _id = Math.floor(Math.random() * 2) + 1;
        try {
            sp_ske.setAnimation(0, this.animNames[this.id][_id], true);
            sp_ske.timeScale = this.timeScale;
            sp_ske.setCompleteListener(function() {
                console.log('------wancheng playWait')    
            })
        } catch(e) {
            console.log("------------e : " + JSON.stringify(e));
        }
       
    },

    playAttack: function(btn, _id, _cb) {
        var self = this;
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        _id = parseInt(_id) + 3;
        var attackId = _id ? _id : Math.floor(Math.random() * 3 + 3);
        sp_ske.setAnimation(0, this.animNames[this.id][attackId], false);
        sp_ske.timeScale = this.timeScale;
        sp_ske.setCompleteListener(function() {
            self.playWait();
            if (_cb) _cb();
        })
    },

    playWin: function(_cb) {
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        var self = this;
        self.winIndex = 0;
        sp_ske.setAnimation(0, this.animNames[this.id][7], true);
        sp_ske.timeScale = this.timeScale;
        sp_ske.setCompleteListener(function() {
            self.winIndex++;
            if (self.winIndex > 2) {
                self.playWait();
                if (_cb) _cb();
            }
        })
    },

    playLose: function() {
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        var self = this;
        sp_ske.setAnimation(0, this.animNames[this.id][6], false);
        sp_ske.timeScale = this.timeScale;
        sp_ske.setCompleteListener(function() {
            // self.playWait();
        })
    },

    playChoose: function() {
        var self = this;
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        sp_ske.setAnimation(0, this.animNames[this.id][8], false);
        sp_ske.timeScale = this.timeScale;
        sp_ske.setCompleteListener(function() {
            self.playWait();
        })
    },

    getWight: function() {
        return this.weight;
    },
    setWeight: function(a) {
        this.weight = a;
    },

})