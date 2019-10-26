
// var man = require("Main");

var Square = cc.Class({
    extends: cc.Component,

    properties: {
        // squre_prefab: {
        //     default: null,
        //     type: cc.Prefab,
        // }
    },
    
    onLoad: function() {
       

    },

    setColor: function(color) {
        color = color || cc.color(100, 100, 100);
        this.node.color = color;
    }

});

// module.exports.square = square;
module.exports = Square;

