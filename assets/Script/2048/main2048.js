

cc.Class({
    extends: cc.Component,

    properties: {
        eachNum: 4,
        lay_main: cc.Layout,
        lay_base: cc.Prefab,
        lb_score: cc.Label,

        baseArr: [],
        baseNumArr: [],

    },

    onLoad: function() {
        var self = this;
        self.totalNum = self.eachNum * self.eachNum;
        self.initGameScene();
        self.randomNextSquare();
    },

    onDestroy: function() {

    },

    gotoBack: function() {
        cc.director.loadScene("mainScene");
    },

    reStartGame: function() {
        var self = this;
        self.resetBaseArr();
        self.resetLayMain();
        self.randomNextSquare();
    },

    initGameScene: function() {
        var self = this;

        self.baseArr = [];
        self.baseNumArr = [];
        if (!self.baseArr.length) {
            for (var i=0; i<self.eachNum; i++) {
                for (var j=0; j<self.eachNum; j++) {
                    if (!self.baseArr[i]) self.baseArr[i] = [];
                    if (!self.baseNumArr[i]) self.baseNumArr[i] = [];
                    var baseNode = cc.instantiate(self.lay_base);
                    self.lay_main.node.addChild(baseNode);
                    baseNode.setName("base_" + (4*i+j));
                    self.baseArr[i].push(baseNode);
                    self.baseNumArr[i].push(1);
                    baseNode.setPosition(cc.p(j * 150, i * 150));
                }
            }
        }
        self.resetBaseArr();
        self.resetLayMain();
    },

    resetBaseArr: function() {
        var self = this;
        if (!self.baseNumArr.length) return;
        for (var i=0; i<self.eachNum; i++) {
            if (!self.baseNumArr[i]) self.baseNumArr[i] = [];
            for (var j=0; j<self.eachNum; j++) {
                if (!self.baseNumArr[i][j]) self.baseNumArr[i][j] = 1;
                self.baseNumArr[i][j] = 1;
            }
        }
        console.log("---------------33  self.baseNumArr : " + JSON.stringify(self.baseNumArr));
    },

    resetLayMain: function() {
        var self = this;
        if (!self.baseArr.length) return;
        for (var i=0; i<self.eachNum; i++) {
            for (var j=0; j<self.eachNum; j++) {
                self.baseArr[i][j].getComponent("base2048").refreshLabel(self.baseNumArr[i][j]);
            }
        }
    },

    // 出现2， 4 的几率 为 70 % 30
    randomNextSquare: function(dir) {
        var self = this;
        var getNextNum = function() {
            var percent = Math.floor(Math.random() * 10);
            if (percent > 6) {
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
                    leftNodes[i].getComponent(cc.Layout).node.scale = 0.3;
                    isSetting = true;
                    var nameArr = leftNodes[i].getName().split("_");
                    self.baseNumArr[Math.floor(parseInt(nameArr[1]) / 4)][Math.floor(parseInt(nameArr[1]) % 4)] = randomNum;
                    leftNodes[i].getComponent('base2048').refreshLabel(randomNum);
                    leftNodes[i].getComponent(cc.Layout).node.runAction(cc.sequence(
                        cc.scaleTo(0.2, 1),
                        cc.callFunc(function() {
                           console.log("-------cb : todo"); 
                        })
                    ))
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
                        self.baseNumArr[i][j] = randomNum;
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

    regroupLayMain: function(dir) {
        var self = this;
        console.log('-----------dir : ' + dir);

        console.log("---------------11self.baseNumArr : " + JSON.stringify(self.baseNumArr));
        if (dir == 1) { // 向上
            for (var i=0; i<self.eachNum; i++) {
                for (var j=self.eachNum - 1; j>0; j--) {
                    if (self.baseNumArr[j][i] < 2) {
                        for (var m = j-1; m>=0; m--) {
                            if (self.baseNumArr[m][i] > 1) {
                                var temp = self.baseNumArr[j][i];
                                self.baseNumArr[j][i] = self.baseNumArr[m][i];
                                self.baseNumArr[m][i] = temp;
                                break;
                            }
                        }
                    }
                }
            }
        } else if (dir == 2) { // 向下
            for (var i=0; i<self.eachNum; i++) {
                for (var j=0; j<self.eachNum; j++) {
                    if (self.baseNumArr[j][i] < 2) {
                        for (var m = j+1; m<self.eachNum; m++) {
                            if (self.baseNumArr[m][i] > 1) {
                                var temp = self.baseNumArr[j][i];
                                self.baseNumArr[j][i] = self.baseNumArr[m][i];
                                self.baseNumArr[m][i] = temp;
                                break;
                            }
                        }
                    }
                }
            }
        } else if (dir == 3) { // 向左
            for (var i=0; i<self.eachNum; i++) {
                for (var j=0; j<self.eachNum; j++) {
                    if (self.baseNumArr[i][j] < 2) {
                        for (var m = j+1; m<self.eachNum; m++) {
                            if (self.baseNumArr[i][m] > 1) {
                                var temp = self.baseNumArr[i][j];
                                self.baseNumArr[i][j] = self.baseNumArr[i][m];
                                self.baseNumArr[i][m] = temp;
                                break;
                            }
                        }
                    }
                }
            }
        } else if (dir == 4) { // 向右
            for (var i=0; i<self.eachNum; i++) {
                for (var j=self.eachNum - 1; j>0; j--) {
                    if (self.baseNumArr[i][j] < 2) {
                        for (var m = j-1; m>=0; m--) {
                            if (self.baseNumArr[i][m] > 1) {
                                var temp = self.baseNumArr[i][j];
                                self.baseNumArr[i][j] = self.baseNumArr[i][m];
                                self.baseNumArr[i][m] = temp;
                                break;
                            }
                        }
                    }
                }
            }
        }

        console.log("---------------22self.baseNumArr : " + JSON.stringify(self.baseNumArr));
        self.resetLayMain();
    },

    showUpAction: function() {
        var self = this;
        // 向上
        self.regroupLayMain(1);
        self.randomNextSquare(1);

    },

    showDownAction: function() {
        var self = this;
        // 向下
        self.regroupLayMain(2);
        self.randomNextSquare(2);

    },

    showLeftAction: function() {
        var self = this;
        // 向左
        self.regroupLayMain(3);
        self.randomNextSquare(3);

    },

    showRightAction: function() {
        var self = this;
        // 向右
        self.regroupLayMain(4);
        self.randomNextSquare(4);

    },

    
})