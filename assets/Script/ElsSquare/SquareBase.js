
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
        this.originPos = {
            x: 0,
            y: 0
        }
        this.resetDataAndDir();
    },

    resetDataAndDir: function() {
        this.direction = Math.floor(Math.random() * 4);
        this.type = Math.floor(Math.random() * 7) + 1;
        this.setDataAndDir(this.type, this.direction);
    },
    setOriginPos: function(x, y) {
        this.originPos.x = x;
        this.originPos.y = y;

        // console.log('-------x : ' + this.originPos.x + '   -------y : ' + this.originPos.y);
    },

    getOriginPos: function() {
        return this.originPos;
    },

    getBaseData: function() {
        return this.dataBase;
    },

    getDirAndType: function() {
        return {dir: this.direction, type: this.type};
    },

    setDirAndType: function(dir, type) {
        this.direction = dir;
        this.type = type;
    },

    setBaseData: function(baseData) {
        this.dataBase = baseData;
        this.refreshData();
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

    canMoveDown: function(isValid) {
        var nextStepMap = {};
        nextStepMap.x = this.originPos.x;
        nextStepMap.y = this.originPos.y - 1;
        return isValid(nextStepMap, this.dataBase);
    },
    canRight: function(isValid) {
        var nextStepMap = {};
        nextStepMap.x = this.originPos.x + 1;
        nextStepMap.y = this.originPos.y;
        return isValid(nextStepMap, this.dataBase);
    },
    canLeft: function(isValid) {
        var nextStepMap = {};
        nextStepMap.x = this.originPos.x - 1;
        nextStepMap.y = this.originPos.y;
        return isValid(nextStepMap, this.dataBase);
    },
    canRotatea: function(isValid) {
        var nextDir = this.direction + 1;
        if (nextDir > 3) {
            nextDir = 0;
        }
        var nextData = sqData["Square" + this.type]["dir" + nextDir];

        return isValid(this.originPos, nextData);
    },
    canFallDown: function(isValid) {
        var nextStepMap = {};
        nextStepMap.x = this.originPos.x;
        nextStepMap.y = this.originPos.y - 1;
        return isValid(nextStepMap, this.dataBase);
    },
});
