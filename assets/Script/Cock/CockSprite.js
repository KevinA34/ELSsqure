cc.Class({
    extends: cc.Component,

    properties: {
        id:0,
        weight: 0,

    },

    onLoad: function() {
        console.log("----------todo ");
    },


    playRun: function() {

    },

    playWait: function() {

    },

    playAttack: function() {

    },

    playWin: function() {

    },

    playLose: function() {

    },

    getWight: function() {
        return this.weight;
    },
    setWeight: function(a) {
        this.weight = a;
    },

    



})