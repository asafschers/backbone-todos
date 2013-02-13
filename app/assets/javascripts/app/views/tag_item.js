// Tag Item View
// --------------

// The DOM element for a tag item...
window.TagView = Backbone.View.extend({

    //... is a list tag.
    tagName:  "li",

    // The TagView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a **Tag** and a **TagView** in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        this.model.bind('change', this.render, this);
        this.model.view = this;
    },

    // Re-render the contents of the tag item.
    render: function() {
        //$(this.el).html(JST.tag_template(this.model.toJSON()));
        $(this.el).html(HandlebarsTemplates['app/assets/templates/tag_template']({ Tag: this.model.toJSON() }))

        this.setContent();
        return this;
    },

    // To avoid XSS (not that it would be harmful in this particular app),
    // we use `jQuery.text` to set the contents of the tag item.
    setContent: function() {
        var name = this.model.get('name');
        this.$('.tag-content').text(name);
        //this.input = this.$('.todo-input');
        //this.input.bind('blur', _.bind(this.close, this));
        //this.input.val(name);
    },

    // Remove this view from the DOM.
    remove: function() {
        $(this.el).remove();
    },

    // Remove the item, destroy the model.
    clear: function() {
        this.model.clear();
    }


});

