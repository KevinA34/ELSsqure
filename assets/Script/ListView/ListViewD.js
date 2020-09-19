const List = require('List');
cc.Class({
    extends: cc.Component,

    
    properties: {
        listV: List,

        listH: List,

        dataInfo: [],
    },

    onLoad: function () {

        for (var i=0; i<100; i++) {
            this.dataInfo.push({idx: i, str: "Hello" + (i+1)});
        }
        this.listV.numItems = this.dataInfo.length;

        this.listH.numItems = this.dataInfo.length;
    },

    onListVRender: function(item, _idx) {
        item.listItem.title.string = this.dataInfo[_idx].str;
    },

    onListHRender: function(item, _idx) {
        var pNode = item.listItem.node;
        pNode.getChildByName("lb_content").getComponent(cc.Label).string = this.dataInfo[_idx].str;
        pNode.getChildByName("title").getComponent(cc.Label).string = this.dataInfo[_idx].idx;
        // pNode.string = this.dataInfo[_idx].idx;
    },

    onDestroy: function() {

    },

    gotoBack: function() {
        cc.director.loadScene("mainScene");
    },

})