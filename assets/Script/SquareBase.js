
var sqData = require("SquareManager");

var SquareBase = cc.Class({
    extends: cc.Component,

    properties: {
        layoutArr: [],
        direction: 0,
        dataBase: [],
        type: 1,
    },
    
    onLoad: function() {
        this.layoutArr =this.node.getChildren();
        this.resetDataAndDir();
    },

    resetDataAndDir: function() {
        this.direction = Math.floor(Math.random() * 4);
        this.type = Math.floor(Math.random() * 7) + 1;
        this.setDataAndDir(this.type, this.direction);
    },

    rotateSquare: function() {
        this.direction += 1;
        if (this.direction > 3) {
            this.direction = 0;
        }
        this.setDataAndDir(this.type, this.direction);
    },

    setDataAndDir: function(type, direction) {
        this.type = type || 1;
        this.direction = direction || 0;

        this.dataBase = sqData['Square' + this.type]["dir" + this.direction];
        this.refreshData();
    },

    getSquareData: function() {
        return sqData['Square' + this.type];
    },

    refreshData: function() {
        if (!this.layoutArr.length)
            return;
        for (var i=0; i<4; i++) {
            for (var j=0; j<4; j++) {
                if (this.dataBase[i][j] == 1) {
                    this.layoutArr[4*i + j].getComponent("Square").setStatus(1);
                    this.layoutArr[4*i + j].active = true;
                } else {
                    this.layoutArr[4*i + j].getComponent("Square").setStatus(0);
                    this.layoutArr[4*i + j].active = false;
                }
            }
        }
    },

    canDown: function(valiad) {
        for (var i=0; i<4; i++) {
            for (var j=0; j<4; j++) {
                valiad(origin.x , i, j);
            }
        }
        ;
    },

    canRight: function() {

    },

    canLeft: function() {

    },
});
