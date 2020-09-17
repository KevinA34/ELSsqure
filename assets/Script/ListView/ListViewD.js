const List = require('List');
cc.Class({
    extends: cc.Component,

    
    properties: {
        listV: List,


    },

    onLoad: function () {

        var data = [];
        for (var i=0; i<100; i++) {
            data.push(i);
        }
        this.listV.numItems = data.length;
    },

    onListVRender: function(item, _data) {
        item.listItem.title.string = JSON.stringify(_data);
    },

    onDestroy: function() {

    },

    gotoBack: function() {
        cc.director.loadScene("mainScene");
    },

    // update: function() {
    // },

})