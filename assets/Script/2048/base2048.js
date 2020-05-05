
cc.Class({
    extends: cc.Component,

    properties: {
        num: 0,
        lb_num: cc.Label,
        lay_bg: cc.Layout,
    },

    onLoad: function() {

    },

    refreshLabel: function(num) {
        if (num < 2 || num > 2048) {
            this.lb_num.node.active = false;
        } else {
            this.lb_num.node.active = true;
        }

        this.setLabelNumber(num);
        this.lb_num.getComponent(cc.Label).string = num;
    },

    getLabelNumber: function() {
        return this.num || 1;
    },

    setLabelNumber: function(num) {
        this.num = num;

        if (num == 1) {
            this.setColor("#998F89");
        } else if (num == 2) {
            this.setColor("#57B645");
        } else if (num == 4) {
            this.setColor("#C8E49E");
        } else if (num == 8) {
            this.setColor("#EE9461");
        } else if (num == 16) {
            this.setColor("#E0C558");
        } else if (num == 32) {
            this.setColor("#5BE4A2");
        } else if (num == 64) {
            this.setColor("#E66A6A");
        } else if (num == 128) {
            this.setColor("#AAAA4F");
        } else if (num == 256) {
            this.setColor("#45B1B6");
        } else if (num == 512) {
            this.setColor("#D06DE9");
        } else if (num == 1024) {
            this.setColor("#78DF50");
        } else if (num == 2048) {
            this.setColor("#457BB6");
        } else {
            this.setColor()
        }
    },

    setColor: function(color) { 
        color = color ? cc.color(color) : cc.color(Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255));
        this.lay_bg.node.color = color;
    },

})