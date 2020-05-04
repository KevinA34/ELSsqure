

cc.Class({
    extends: cc.Component,

    properties: {
        lay_main: cc.Layout,

        lb_score: cc.Label,

    },

    onLoad: function() {

    },
    
    onDestroy: function() {

    },

    gotoBack: function() {
        cc.director.loadScene("mainScene");
    },

    showUpAction: function() {

    },

    showDownAction: function() {

    },

    showRightAction: function() {

    },

    showLeftAction: function() {

    },
    
})