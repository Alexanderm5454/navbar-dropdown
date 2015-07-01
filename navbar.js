/**
 * Author: Alexander Markowski
 * Licence MIT
 */ 

;
(function($) {
    $(document).ready(function() {
        
        function DropDownAction() {
            this.navItems = {};
            this.navItems.subItems = {};
            this.heights = [];
            this.navItemClass = "childClass";
            this.navSubItemClass = "grandChildClass";
        }

        DropDownAction.prototype.init = function () {
            this.navItems = $("[data-action='drop-down']").children();
            $(this.navItems).addClass(this.navItemClass);
            var self = this;
            $(this.navItems).each(function () {
                this.subItems = $(this).children();
                if (this.subItems.length > 1) {
                    $(this.subItems).addClass(self.navSubItemClass).hide();
                }
            });
            this.dropDown();
        };

        DropDownAction.prototype.dropDown = function () {
            var self = this;
            $(this.navItems).hover(function() {
                $("." + self.navSubItemClass).hide();
                var thisHeight = Number($(this).outerHeight());
                thisWidth = Number($(this).outerWidth());
                self.getSubItemsHeight(this.subItems);
                $(this.subItems).show();
                self.showSubItems(this.subItems, thisHeight, thisWidth);
                self.clicked = true;
            }, function() {
                self.hideSubItems();
            });
        };

        DropDownAction.prototype.getSubItemsHeight = function(subItems) {
            var self = this;
            $(subItems).each(function(index) {
                self.heights[index] = $(this).outerHeight();
            });

        };

        DropDownAction.prototype.showSubItems = function(subItems, thisHeight, thisWidth) {
            if (this.heights.length > 0) {
                var pos = thisHeight,
                    self = this;

                $("."+this.navSubItemClass).css({"position": "absolute", "top": thisHeight, "width": thisWidth, "left": "0px", "z-index": "999"});
                    $(subItems).each(function(index) {
                        $(this).animate({"top": pos}, 500);
                        pos +=  Number(self.heights[index]);
                    });
                }
        };

        DropDownAction.prototype.hideSubItems = function() {
            this.heights.length = 0;
            $("."+this.navSubItemClass).hide();
        };
        new DropDownAction().init();
    });
}(jQuery));
