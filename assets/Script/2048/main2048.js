

cc.Class({
    extends: cc.Component,

    properties: {
        eachNum: 4,
        lay_main: cc.Layout,
        lay_base: cc.Prefab,
        lb_score: cc.Label,

        baseArr: [],

    },

    onLoad: function() {
        var self = this;
        self.totalNum = self.eachNum * self.eachNum;
        self.initScene();
        self.randomNextSquare();
    },

    initScene: function() {
        var self = this;

        self.baseArr = [];
        if (!self.baseArr.length) {
            for (var i=0; i<self.eachNum; i++) {
                for (var j=0; j<self.eachNum; j++) {
                    if (!self.baseArr[i]) self.baseArr[i] = [];
                    var baseNode = cc.instantiate(self.lay_base);
                    self.lay_main.node.addChild(baseNode);
                    baseNode.setName("base" + (4*i+j));
                    self.baseArr[i].push(baseNode);
                    baseNode.setPosition(cc.p(j * 150, i * 150));
                }
            }
        }
        self.initLayMain();
    },

    initLayMain: function() {
        var self = this;
        if (!self.baseArr.length) return;
        // var arr = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
        var arr = [];
        for (var i=0; i<self.eachNum; i++) {
            for (var j=0; j<self.eachNum; j++) {
                self.baseArr[i][j].getComponent("base2048").refreshLabel(arr[self.eachNum * i + j] || 1);
            }
        }
    },

    // 出现2， 4 的几率 为 50 % 50
    randomNextSquare: function(dir) {
        var self = this;
        var getNextNum = function() {
            var percent = Math.floor(Math.random() * 10)
            if (percent > 4) {
                return 4;
            }
            return 2;
        }

        var randomPositon = function(leftNum, leftNodes) {
            var randomIndex = Math.floor(Math.random() * leftNum);
            // console.log('-----------leftNum : ' + leftNum);
            // console.log('-----------randomIndex : ' + randomIndex);
            // console.log('-----------leftNodeslength : ' + leftNodes.length);
            var idx = 0;
            var isSetting = false;
            for (var i=0; i<leftNodes.length; i++) {
                if (idx == randomIndex) {
                    isSetting = true;
                    leftNodes[i].getComponent('base2048').refreshLabel(randomNum);
                    break;
                }
                idx++;
            }
            if (isSetting) {
                console.log('-------------赋值成功');
            } else {
                console.log('-------------没有赋值');
            }
        }

        var randomNum = getNextNum();
        var leftNum = self.eachNum;
        var leftNodes = [];
        // console.log('-----------dir : ' + dir);
        // console.log("----------randomNum : " + randomNum);
        if (!dir) {
            var leftNum = self.eachNum * self.eachNum;
            var randomIndex = Math.floor(Math.random() * leftNum);
            // console.log('-----------randomIndex : ' + randomIndex);
            for (var i=0; i<self.eachNum; i++) {
                var isBreak = false;
                for (var j=0; j<self.eachNum; j++) {
                    if ((self.eachNum * i + j) == randomIndex) {
                        self.baseArr[i][j].getComponent('base2048').refreshLabel(randomNum);
                        isBreak = true;
                        break;
                    }
                }
                if (isBreak) {
                    break;
                }
            }
        } else if (dir == 1){ // 向上移动  
            for (var i=0; i<self.eachNum; i++) {
                var baseNum = self.baseArr[0][i].getComponent('base2048').getLabelNumber();
                if (baseNum > 1) {
                    leftNum -= 1;
                } else {
                    leftNodes.push(self.baseArr[0][i]);
                }
            }
            randomPositon(leftNum, leftNodes);

        } else if (dir == 2) { // 向下移动  
            for (var i=0; i<self.eachNum; i++) {
                var baseNum = self.baseArr[self.eachNum - 1][i].getComponent('base2048').getLabelNumber();
                if (baseNum > 1) {
                    leftNum -= 1;
                } else {
                    leftNodes.push(self.baseArr[self.eachNum - 1][i]);
                }
            }
            randomPositon(leftNum, leftNodes);

        } else if (dir == 3) { // 向左移动 
            for (var i=0; i<self.eachNum; i++) {
                var baseNum = self.baseArr[i][self.eachNum - 1].getComponent('base2048').getLabelNumber();
                if (baseNum > 1) {
                    leftNum -= 1;
                } else {
                    leftNodes.push(self.baseArr[i][self.eachNum - 1]);
                }
            }
            randomPositon(leftNum, leftNodes);

        } else if (dir == 4) { // 向右移动 
            for (var i=0; i<self.eachNum; i++) {
                var baseNum = self.baseArr[i][0].getComponent('base2048').getLabelNumber();
                if (baseNum > 1) {
                    leftNum -= 1;
                } else {
                    leftNodes.push(self.baseArr[i][0]);
                }
            }
            randomPositon(leftNum, leftNodes);

        }

    },
    
    onDestroy: function() {

    },

    gotoBack: function() {
        cc.director.loadScene("mainScene");
    },

    showUpAction: function() {
        var self = this;
        self.randomNextSquare(1);

    },

    showDownAction: function() {
        var self = this;
        self.randomNextSquare(2);

    },

    showLeftAction: function() {
        var self = this;
        self.randomNextSquare(3);

    },

    showRightAction: function() {
        var self = this;
        self.randomNextSquare(4);

    },

    
})