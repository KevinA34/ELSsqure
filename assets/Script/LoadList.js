
var sceneList = require("gameData.js").sceneList;

var LoadList = cc.Class({
    extends: cc.Component,

    properties: {
        item_prefab: {
            default: null,
            type: cc.Prefab,
        },
        item_height: 22,
        item_number: 20,

    },
    
    onLoad: function() {
        let y =0;
        console.log('--sceneList length: ' + sceneList.length);
        this.node.height = (this.item_number + 1) * this.item_height;
        for (var i=0; i<this.item_number; i++) {
            var item = cc.instantiate(this.item_prefab).getComponent("LoadItem");
            item.init(this);
            item.updateItem(i+1, "HelloWorld  + " + i);

            item.node.y -= this.item_height*(i + 1);
            // console.log('-----item.node.y : ' + item.node.y);
            this.node.addChild(item.node);
        }
    },


});

