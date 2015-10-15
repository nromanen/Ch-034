define(function(require) {
    "use strict";

    var Backbone = require("backbone"),
        
    View = Backbone.View.extend({
        manage: true
       /* addSubviews: function() {   
            _.each(arguments, function(view, index) {
                if (!(view instanceof Backbone.View)) {
                  throw new Error("Subview must be a Backbone.View");  
                }
                var key = view.cid;
                (this.subviews || (this.subviews = {}))[key] = (view);
            }, this);
            
            return this.subviews;
        },

        renderSubviews: function() {
            var subviews = this.subviews;
            if (!subviews) return this;
            _.each(subviews, function(subview) {
                console.log(subview.render());
                (subview.render().$el).appendTo(this.el);
            }, this);
            return this;
        },

        removeSubviews: function() {
            var children = this.subviews;
            if (!children) return this;
            //this.$el.animate({"opacity": 0,"right": "-=1000"}, 500, "swing");
            _.each(children, function(child) {
            child.remove();
            });
            //this.$el.animate({"opacity": 100,"right": "+=1000"}, 500, "swing");
            delete this.subviews;
            return this;
        },

        remove: function() {
          if (this.subviews) _.invoke(this.subviews, 'remove');
          return Backbone.View.prototype.remove.call(this);
        }*/

    });

    return View;
});