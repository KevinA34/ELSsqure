// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        pNode : cc.Layout,
        lb_score: cc.Label,
        lb_time: cc.Label,
        nextSq: null,
        bg_sqNext: cc.Layout,
        // nextSq: {
        //     default: null,
        //     type: cc.Prefab
        // },
        sqBase_prefab: {
            default: null,
            type: cc.Prefab,
        },
        sq_prefab: {
            default: null,
            type: cc.Prefab,
        },
        actSqArr: [

        ],
        actSqDataArr: [

        ],
        sq_column: 10,
        sq_line: 17,
        game_status: true,
        btn_pause: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var that = this;
        
        this.initTouchEvent();

        this.initPNode();
        // 开始游戏
        this.startGame();
    },

    pauseGame: function() {
        this.game_status = !this.game_status;
        this.btn_pause.node.getChildByName("Background").getChildByName("Label").getComponent(cc.Label).string = this.game_status ? "暂停" : "继续游戏";
    },

    startGame: function() {
        if (!this.getGameStatus()) {
            // 暂停
            return;
        }

        this.actSqPre.active = true;
        this.timeCnt = 0;
        this.lb_scoreCnt = 0;
        this.schedule(this.updateTimeAndActSquare, 0.5);
        this.resetPNode();
        this.randomSqNext();
    },

    showHelloWorldScene: function() {
        cc.director.loadScene("mainScene");
    },

    getGameStatus: function() {
        return this.game_status;
    },

    updateTimeAndActSquare: function() {
        var that = this;
        if (!that.getGameStatus()) {
            // 暂停
            return;
        }
        that.timeCnt += 1;
        that.lb_time.string = "时间：" + that.timeCnt;
        that.checkFallDownAndMknext();
    },

    randomSqNext: function() {
        this.nextSq = this.bg_sqNext.node.getChildByName("nextSq");
        var type = Math.floor(Math.random() * 7) + 1;
        var dir = Math.floor(Math.random() * 3);
        this.nextSq.getComponent("SquareBase").setDataAndDir(type, dir);
    },

    initPNode: function(s_prefab) {
        for (var i=0; i<this.sq_line; i++) {
            if (!this.actSqArr[i]) {
                this.actSqArr[i] = [];
            }
            if (!this.actSqDataArr[i]) {
                this.actSqDataArr[i] = [];
            }
            for (var j=0; j<this.sq_column; j++) {
                var _node;
                if (!this.pNode.node.getChildByName("s" + (i + 1) + "_" + j)) {
                    _node = cc.instantiate(this.sq_prefab);
                    _node.setName("s" + (i + 1) + "_" + j);
                    this.pNode.node.addChild(_node);
                } else {
                    _node = this.pNode.node.getChildByName("s" + (i + 1) + "_" + j)
                }
                _node.setPosition(30 + j * 60, 30+i*60);
                _node.getComponent("Square").setStatus(0);
                this.actSqArr[i].push(_node);
                this.actSqDataArr[i].push(0);
            }
        }
        this.actSqPre = cc.instantiate(this.sqBase_prefab);
        // this.actSqPre.setAnchorPoint(0, 0);
        this.pNode.node.addChild(this.actSqPre);
        this.resetActSpPre();
    },

    resetActSpPre: function(baseData, dirAndType) {
        var squareBase = this.actSqPre.getComponent("SquareBase");
        squareBase.setOriginPos(this.sq_column/2 - 2, this.sq_line - 4);
        if (dirAndType) {
            squareBase.setDirAndType(dirAndType.dir, dirAndType.type);
        }
        if (baseData) {
            squareBase.setBaseData(baseData);
        }
        this.actSqPre.x = 60 * this.sq_column/2;
        this.actSqPre.y = 60 * (this.sq_line - 2);
    },

    initTouchEvent: function() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    checkFallDownAndMknext: function() {
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canMoveDown(this.isValid.bind(this))) {
            this.moveDown();
        } else {
            var originPos = squareBase.getOriginPos();
            var baseData = squareBase.getBaseData();
            // 将 主屏幕 act_layout pNode 里对应的模块置灰
            for (var i=0; i < baseData.length;i++) {
                for (var j=0; j<baseData[i].length; j++) {
                    if (baseData[i][j] == 1) {
                        if (this.checkSq(originPos, j, 3-i)) {
                            // 找到对应的 pNode里面的方块， 颜色置灰色
                            this.actSqDataArr[originPos.y+3-i][originPos.x + j] = 2;
                            this.actSqArr[originPos.y + 3-i][originPos.x + j].getComponent("Square").setStatus(2);
                        }
                    }
                }
            }
            // 检查消行     // todo
            var clearColumnNum = this.clearColumnFuc();
            if (clearColumnNum) {
                this.calcScore(clearColumnNum);
                console.log('--------- clearColumnNum : ' + clearColumnNum);
            }

            // 产生到结束位置没有下降 表示已经结束了
            if (originPos.y == this.sq_line - 4) {
                this.actSqPre.active = false;
                // gameOver;
                this.unschedule(this.updateTimeAndActSquare);
            } else {

                // 从next 里面获取下一个方块到主屏幕
                var nextBaseData = this.nextSq.getComponent("SquareBase").getBaseData();
                var nextDirAndtype = this.nextSq.getComponent("SquareBase").getDirAndType();
                this.resetActSpPre(nextBaseData, nextDirAndtype);

                //重新产生下一个方块
                this.randomSqNext();
            }
        }
    },

    calcScore: function(clearColumnNum) {
        var addScore = 1;
        if (clearColumnNum == 1) {
            addScore = 1;
        } else if (clearColumnNum == 2){
            addScore = 3;
        } else if (clearColumnNum == 3) {
            addScore = 5;
        } else if (clearColumnNum == 4) {
            addScore = 10;
        }
        this.addTotalScore(addScore);
    },

    clearColumnFuc: function() {
        var clearColumnNum = 0;
        for (var i=0; i<this.sq_line; i++) {
            var isAllLineFull = false;
            for (var j=0; j<this.sq_column; j++) {
                if (this.actSqDataArr[i][j] != 2) {
                    break;
                }
                if (j == this.sq_column - 1) {
                    isAllLineFull = true;
                }
            }
            if (isAllLineFull) {
                clearColumnNum++;
                for (var j=0; j<this.sq_column; j++) {
                    if (this.actSqDataArr[i][j] == 2) {
                        this.actSqDataArr[i][j] = 0;
                        this.actSqArr[i][j].getComponent("Square").setStatus(0);
                    }
                }
                for (var m=i; m<this.sq_line - 1; m++) {
                    var emptyNum = 0;
                    for (var k=0; k<this.sq_column; k++) {
                        this.actSqDataArr[m][k] = this.actSqDataArr[m + 1][k];
                        this.actSqArr[m][k].getComponent("Square").setStatus(this.actSqDataArr[m+1][k]);
                        if (this.actSqDataArr[m+1][k] == 1) {
                            emptyNum++;
                        }
                    }
                    if (emptyNum >= 10) {
                        break;
                    }
                }
                // 方便下一行继续消
                i--;
            }
        }
        return clearColumnNum;
    },

    onKeyDown: function(event) {
        
    },
    onKeyUp: function(event) {
        console.log('-------------event.keyCode' + event.keyCode);
        switch (event.keyCode) {
            case cc.macro.KEY.w:
                this.moveRotate();
                break;
            case cc.macro.KEY.a:
                this.moveLeft();
                break;
            case cc.macro.KEY.d:
                this.moveRight();
                break;
            case cc.macro.KEY.s:
                this.moveDown();
                break;
            case cc.macro.KEY.space:
                this.fallDown();
                break;
            default:
                break;
        }
    },
    moveRotate: function() {
        if (!this.getGameStatus()) {
            // 暂停
            return;
        }
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canRotatea(this.isValid.bind(this))) {
            squareBase.rotateSquare();
        }
    },
    moveLeft: function() {
        if (!this.getGameStatus()) {
            // 暂停
            return;
        }
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canLeft(this.isValid.bind(this))) {
            this.actSqPre.x -= 60;
            squareBase.setOriginPos(squareBase.originPos.x - 1,squareBase.originPos.y);
        }
    },
    moveRight: function() {
        if (!this.getGameStatus()) {
            // 暂停
            return;
        }
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canRight(this.isValid.bind(this))) {
            this.actSqPre.x += 60;
            squareBase.setOriginPos(squareBase.originPos.x + 1,squareBase.originPos.y);
        }
    },
    moveDown: function() {
        if (!this.getGameStatus()) {
            // 暂停
            return;
        }
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canMoveDown(this.isValid.bind(this))) {
            this.actSqPre.y -= 60;
            squareBase.setOriginPos(squareBase.originPos.x,squareBase.originPos.y - 1);
        }
    },
    fallDown: function() {
        if (!this.getGameStatus()) {
            // 暂停
            return;
        }
        var squareBase = this.actSqPre.getComponent("SquareBase");
        while(squareBase.canFallDown(this.isValid.bind(this)) && this.actSqPre.y > 0) {
            this.actSqPre.y -= 60;
            squareBase.setOriginPos(squareBase.originPos.x,squareBase.originPos.y - 1);
        }
    },

    resetPNode: function() {
        for (var i=0; i<this.sq_line; i++) {
            for (var j=0; j<this.sq_column; j++) {
                this.actSqArr[i][j].getComponent("Square").setStatus(0);
                this.actSqDataArr[i][j] = 0;
            }
        }
    },

    isValid: function(origin, data) {
        for (var i=0; i<data.length; i++) {
            for (var j=0; j<data[i].length; j++) {
                if (data[i][j] == 1) {
                    if (!this.checkSq(origin, j, 3-i)) {
                        // console.log('-------i : ' + (3-i) + '    j:' + j);
                        return false;
                    }
                }
            }
        }
        return true;
    },

    // 检查 没有越界、并且没有已经放下的
    checkSq: function(origin, x, y) {
        if (origin.x + x >= this.sq_column) {
            return false;
        }
        else if (origin.x + x < 0) {
            return false;
        }
        else if (origin.y + y >= this.sq_line) {
            return false;
        }
        else if (origin.y + y < 0) {
            return false;
        }
        else if (this.actSqArr[origin.y + y][origin.x + x].getComponent("Square").getStatus() == 2) {
            return false;
        }
        return true;
    },

    addTotalScore: function (addScore) {
        this.lb_scoreCnt += addScore;
        this.lb_score.string = "得分：" + this.lb_scoreCnt;
    },

    start () {

    },

    // update (dt) {},
    onDetory() {
        cc.systemEvent.off(cc.systemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.systemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
});
