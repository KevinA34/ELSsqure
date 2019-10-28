
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
        // this.setStatus();
    },

    setStatus: function(status) {
        this.status = status || 0;
        if (this.status == 1) {
            this.node.active = true;
            this.setColor(cc.color(128, 220, 130));
        } else if (this.status == 2) {
            this.node.active = true;
            this.setColor(cc.color(100, 100, 100));
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

