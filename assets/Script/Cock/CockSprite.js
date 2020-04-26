import { timingSafeEqual } from "crypto";

cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
        weight: 0,

        sp_cock: {
            default: null,
            type: sp.Skeleton
        },

        

    },

    onLoad: function() {
        this.animNames = {
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
        console.log("----------CockSprite  onLoad ");
    },

    initCock: function(info) {
        console.log("-------cockinfo: " + JSON.stringify(info));
        var self = this;
        self.id = info.id
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        // if (sp_ske) {
        //     cc.loader.loadRes("cock/animations/ji" + info.id + "/ji" + info.id + ".atlas", sp.SkeletonData, function(err, spine) {
        //         if (err) {
        //             console.log('err : ' + JSON.stringify(err));
        //             return;
        //         }
        //         sp_ske.SkeletonData = spine;
        //         self.playWait();
        //     })
        // }
    },


    playRun: function() {
        console.log("-----------play run  ");
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        sp_ske.clearTrack();
        sp_ske.setAnimation(0, this.animNames[this.id][0], true);
        sp_ske.setCompleteListener(function() {
            console.log('------wancheng playRun')    
        })
    },

    playWait: function() {
        console.log("------playWait" + this.id);
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        sp_ske.clearTrack();
        try {
            sp_ske.setAnimation(0, this.animNames[this.id][2], true);
            sp_ske.setCompleteListener(function() {
                console.log('------wancheng playWait')    
            })
        } catch(e) {
            console.log("------------e : " + JSON.stringify(e));
        }
       
    },

    playAttack: function() {

    },

    playWin: function() {
        console.log("-----------playWin  ");
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        sp_ske.clearTrack();
        sp_ske.setAnimation(0, this.animNames[this.id][7], false);
        sp_ske.setCompleteListener(function() {
            console.log('------wancheng playWin')    
        })
    },

    playLose: function() {
        var sp_ske = this.sp_cock.getComponent(sp.Skeleton);
        sp_ske.clearTrack();
        sp_ske.setAnimation(0, this.animNames[this.id][6], false);
        sp_ske.setCompleteListener(function() {
            console.log('------wancheng lose')    
        })
    },

    getWight: function() {
        return this.weight;
    },
    setWeight: function(a) {
        this.weight = a;
    },

    



})