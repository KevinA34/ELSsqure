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

        var ji1Map = {
            id: Math.floor(Math.random() * 4) + 1,
            weight: Math.random() * 2 + 4
        }
        
        var cockJS = this.cock_0.getComponent("CockSprite");
        if (cockJS) {
            cockJS.initCock(ji1Map);
        } else {
            console.log("--------11hahahaaa11")
        }

        var ji2Map = {
            id: Math.floor(Math.random() * 4) + 1,
            weight: Math.random() * 2 + 4
        }
        var cockJS = this.cock_1.getComponent("CockSprite");
        if (cockJS) {
            cockJS.initCock(ji2Map);
        }

    },

    // update: function() {
    //     // 
    // },

    gotoBack: function() {
        cc.director.loadScene("mainScene");
    },

    startCockFight: function() {

    },

})