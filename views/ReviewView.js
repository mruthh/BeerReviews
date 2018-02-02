var ReviewView = Backbone.View.extend({

  className: 'review',

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this
  },

  template: Handlebars.compile($('#review-template').html()),


})
