

cc.Class({
    extends: cc.Component,

    properties: {
        btn_back: cc.Button,

    },
    
    onLoad: function() {
        console.log("-------------todo");

    },

    update: function() {
        // 
    },

    gotoBack: function() {
        cc.director.loadScene("helloworld");
    },

    startCockFight: function() {

    },

})