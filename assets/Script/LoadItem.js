
// var man = require("Main");

var LoadList = cc.Class({
    extends: cc.Component,

    properties: {
        lb_idx: cc.Label,
        lb_content: cc.Label,
    },
    
    onLoad: function() {
        
    },

    init: function(list) {
        this.list = list;
        // console.log('------ this.list.height' + this.list.item_height);
    },

    updateItem: function(idx, content) {
        this.lb_idx.string = idx || -1;
        this.lb_content.string = content || "";
    },

    itemClick: function() {
        console.log('you click di ' + this.lb_idx.string + ' ge');
    },

});

