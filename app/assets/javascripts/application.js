// An example Backbone application contributed by
// [Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

//= require jquery
//= require jquery_ujs
//= require jquery-ui

//= require underscore
//= require backbone

//= require jammit_handlebars_templates.js
//= require handlebars

//= require_tree .


// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

     // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),
    selected_tag: null,

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "keyup #new-todo":     "showTooltip",
      "click .todo-clear a": "clearCompleted",
      "click div.tag-content":  "tagFilter"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

      selected_tag = "all"

      Tags.fetch({
          success: function () {

              Todos.fetch();
          }
      });


      this.input    = this.$("#new-todo");

      Todos.bind('add',   this.addOne, this);
      Todos.bind('reset', this.addAll, this);
      Todos.bind('all', this.render, this);

      Tags.bind('reset', this.addAll_tags, this);

    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

    //  this.$('#todo-stats').html(JST.stats_template({
    //    total:      Todos.length,
    //    done:       Todos.done().length,
    //    remaining:  Todos.remaining().length
    //  }));

    },

      tagFilter: function(e){

          // get tag name
          selected_tag = $(e.target).text();

          // 1. add all button

          this.addAll();
          this.$('#todo-stats').html(HandlebarsTemplates['app/assets/templates/debug_template']({ ID: selected_tag }));

      },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {

          var view = new TodoView({model: todo});
          this.$("#todo-list").append(view.render().el);

    },

    // Add all items in the **Todos** collection at once.
    //addAll: function() {
    addAll: function() {

      //Todos.each(this.addOne);
        this.$("#todo-list").empty()
      _.each(Todos.tag_filter(selected_tag),  this.addOne );

    },


      // Add a single tag item to the list by creating a view for it, and
      // appending its element to the `<ul>`.
      addOne_tags: function(tag) {
          var view = new TagView({model: tag});
          this.$("#tag-list").append(view.render().el);
      },

      // Add all items in the **Tags** collection at once.
      addAll_tags: function() {
          Tags.each(this.addOne_tags);
      },

    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        content: this.input.val(),
        order:   Todos.nextOrder(),
        done:    false
      };
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      Todos.create(this.newAttributes());
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(Todos.done(), function(todo){ todo.clear(); });
      return false;
    },

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    }

  });

  // Create our global collection of **Todos**.
  window.Todos = new window.TodoList;

  // Create our global collection of **Tags**.
  window.Tags = new window.TagList;

  // Finally, we kick things off by creating the **App**.
  window.App = new window.AppView;

});