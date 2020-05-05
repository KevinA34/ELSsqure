

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
        self.initScene();

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
                    self.baseArr[i].push(baseNode);
                    baseNode.setPosition(cc.p(i * 150, j * 150));
                }
            }
        }
        self.initLayMain();
    },

    initLayMain: function() {
        var self = this;
        if (!self.baseArr.length) return;
        var arr = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048]
        for (var i=0; i<self.eachNum; i++) {
            for (var j=0; j<self.eachNum; j++) {
                self.baseArr[i][j].getComponent("base2048").refreshLabel(arr[self.eachNum * i + j] || 11111);
            }
        }
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