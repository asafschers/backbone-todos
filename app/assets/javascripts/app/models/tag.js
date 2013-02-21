// Tag Model
// ----------

// Our basic **Tag** model has `name` attribute.
window.Tag = Backbone.Model.extend({

    // Default attributes for the tag.
    defaults: {
        name: "empty tag..."
    },

    // Ensure that each tag created has `name`.
    initialize: function() {
        if (!this.get("name")) {
            this.set({"name": this.defaults.name});
        }
    },

    // Remove this Tag from *localStorage* and delete its view.
    clear: function() {
        this.destroy();
        this.view.remove();
    }

});

// Tag Collection
// ---------------

// The collection of tags is backed by *localStorage* instead of a remote
// server.
window.TagList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Tag,
    url :'/tags'

});
