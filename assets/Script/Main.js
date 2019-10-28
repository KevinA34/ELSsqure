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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var that = this;
        this.timeCnt = 0;
        this.lb_scoreCnt = 0;
        this.schedule(function() {
            that.timeCnt += 1;
            that.lb_time.string = "时间：" + that.timeCnt;
            that.checkFallDownAndMknext();
        }, 1);
        this.initPNode();
        this.initTouchEvent();

        this.randomSqNext();
    },

    randomSqNext: function() {
        this.nextSq = this.bg_sqNext.node.getChildByName("nextSq");
        var type = Math.floor(Math.random() * 7) + 1;
        var dir = Math.floor(Math.random() * 3);
        this.nextSq.getComponent("SquareBase").setDataAndDir(type, dir);
    },

    initPNode: function(s_prefab) {
        var line = 17;
        var column = 10;

        for (var i=0; i<line; i++) {
            if (!this.actSqArr[i]) {
                this.actSqArr[i] = [];
            }
            if (!this.actSqDataArr[i]) {
                this.actSqDataArr[i] = [];
            }
            for (var j=0; j<column; j++) {
                var _node;
                if (!this.pNode.node.getChildByName("s" + (i + 1) + "_" + j)) {
                    _node = cc.instantiate(this.sq_prefab);
                    _node.setName("s" + (i + 1) + "_" + j);
                    this.pNode.node.addChild(_node);
                } else {
                    _node = this.pNode.node.getChildByName("s" + (i + 1) + "_" + j)
                }
                _node.setPosition(30 + j * 60, 30+i*60);
                // _node.getComponent("Square").setStatus(0);
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
        var line = 17;
        var column = 10;
        var squareBase = this.actSqPre.getComponent("SquareBase");
        squareBase.setOriginPos(column/2 - 2, line - 4);
        if (baseData) {
            squareBase.setBaseData(baseData);
        }
        if (dirAndType) {
            squareBase.setDirAndType(dirAndType.dir, dirAndType.type);
        }
        this.actSqPre.x = 60 * column/2;
        this.actSqPre.y = 60 * (line - 2);
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
            var orignPos = squareBase.getOriginPos();
            var baseData = squareBase.getBaseData();
            // 将 主屏幕 act_layout pNode 里对应的模块置灰

            var nextBaseData = this.nextSq.getComponent("SquareBase").getBaseData();
            var nextDirAndtype = this.nextSq.getComponent("SquareBase").getDirAndType();
            this.resetActSpPre(nextBaseData, nextDirAndtype);
            this.randomSqNext();
            
        }
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
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canRotatea(this.isValid.bind(this))) {
            squareBase.rotateSquare();
        }
    },
    moveLeft: function() {
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canLeft(this.isValid.bind(this))) {
            this.actSqPre.x -= 60;
            squareBase.setOriginPos(squareBase.originPos.x - 1,squareBase.originPos.y);
        }
    },
    moveRight: function() {
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canRight(this.isValid.bind(this))) {
            this.actSqPre.x += 60;
            squareBase.setOriginPos(squareBase.originPos.x + 1,squareBase.originPos.y);
        }
    },
    moveDown: function() {
        var squareBase = this.actSqPre.getComponent("SquareBase");
        if (squareBase.canMoveDown(this.isValid.bind(this))) {
            this.actSqPre.y -= 60;
            squareBase.setOriginPos(squareBase.originPos.x,squareBase.originPos.y - 1);
        }
    },
    fallDown: function() {
        var squareBase = this.actSqPre.getComponent("SquareBase");
        while(squareBase.canFallDown(this.isValid.bind(this)) && this.actSqPre.y > 0) {
            this.actSqPre.y -= 60;
            squareBase.setOriginPos(squareBase.originPos.x,squareBase.originPos.y - 1);
        }
    },

    refreshPNode: function() {
        for (var i=0; i<17; i++) {
            for (var j=0; j<10; j++) {
                if (this.actSqDataArr[i][j] == 1) {
                    this.actSqArr[i][j].getComponent("Square").setStatus(1);
                } else if (this.actSqDataArr[i][j] == 2) {
                    this.actSqArr[i][j].getComponent("Square").setStatus(2);
                } else {
                    this.actSqArr[i][j].getComponent("Square").setStatus(0);
                }
            }
        }
    },

    isValid: function(origin, data) {
        for (var i=0; i<data.length; i++) {
            for (var j=0; j<data[i].length; j++) {
                if (data[i][j] == 1) {
                    if (!this.checkSq(origin, j, 3-i)) {
                        console.log('-------i : ' + (3-i) + '    j:' + j);
                        return false;
                    }
                }
            }
        }
        return true;
    },

    // 检查 没有越界、并且没有已经放下的
    checkSq: function(origin, x, y) {
        if (origin.x + x >= 10) {
            return false;
        }
        else if (origin.x + x < 0) {
            return false;
        }
        else if (origin.y + y >= 17) {
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
