
var sqData = require("SquareManager");

var SquareBase = cc.Class({
    extends: cc.Component,

    properties: {
        layoutArr: [],
        direction: 0,
        dataBase: [],
        type: 1,
        dir: 0,
    },
    
    onLoad: function() {
        // this.node.getComponents().length;
        this.node.cascadeOpacity = false;
        this.layoutArr = this.node.getChildren();
        this.setDataAndDir(Math.floor(Math.random() * 7) + 1, Math.floor(Math.random() * 4));
    },

    rotateSquare: function() {
        this.dir += 1;
        if (this.dir > 3) {
            this.dir = 0;
        }
        this.setDataAndDir(this.idx, this.dir);
    },

    setDataAndDir: function(idx, dir) {
        this.idx = idx || 1;
        this.dir = dir || 0;

        this.dataBase = sqData['Square' + this.idx]["dir" + this.dir];
        this.refreshData();
    },

    getSquareData: function() {
        return sqData['Square' + this.idx];
    },

    refreshData: function() {
        if (!this.layoutArr.length)
            return;
        for (var i=0; i<4; i++) {
            for (var j=0; j<4; j++) {
                if (this.dataBase[i][j] == 1) {
                    this.layoutArr[4*i + j].getComponent("Square").setColor(cc.color(128, 220, 130));
                    this.layoutArr[4*i + j].active = true;
                } else {
                    this.layoutArr[4*i + j].getComponent("Square").setColor(cc.color("#FFFFFF"));
                    this.layoutArr[4*i + j].active = false;
                }
            }
        }
    },

});
