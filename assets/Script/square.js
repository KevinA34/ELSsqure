
// var man = require("Main");

var Square = cc.Class({
    extends: cc.Component,

    properties: {
        // squre_prefab: {
        //     default: null,
        //     type: cc.Prefab,
        // }
        status: 1,
    },
    
    onLoad: function() {
        
    },

    setStatus: function(status) {
        this.status = status || 1;
        if (this.status == 1) {
            this.setColor(cc.color(128, 220, 130));
        } else if (this.status == 2) {
            this.setColor(cc.color(cc.color(100, 100, 100)));
        } else {
            this.node.active = false;
        }
    },

    getStatus: function() {
        return this.status;
    },

    setColor: function(color) {
        color = color || cc.color(100, 100, 100);
        this.node.color = color;
    }

});

// module.exports.square = square;
module.exports = Square;

