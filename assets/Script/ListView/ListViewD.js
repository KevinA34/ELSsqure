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
            this.dataInfo.push({idx: i, str: "HelloWorld" + (i+1)});
        }
        this.listV.numItems = this.dataInfo.length;

        this.listH.numItems = data.length;
    },

    onListVRender: function(item, _idx) {
        item.listItem.title.string = this.dataInfo[_idx].str;
    },

    onListHRender: function(item, _idx) {
        item.listItem.title.string = this.dataInfo[_idx].str;
    },

    onDestroy: function() {

    },

    gotoBack: function() {
        cc.director.loadScene("mainScene");
    },

})