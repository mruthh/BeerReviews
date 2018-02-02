var BeerDetailView = Backbone.View.extend({
  el: $('.reviews-container'),

  events: {
    'click .submit-review': 'submitReview'
  },

  className: 'reviews-container-inner',

  template: Handlebars.compile($('#beer-detail-template').html()),

  initialize: function(){
    this.$userName = this.$('#review-name-input')
    this.$reviewNotes = this.$('#review-notes-input')
    this.listenTo(this.model.get('reviews'), 'add', this.renderReview)
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    this.renderReviews();

    return this;
  },
  renderReviews: function () {
    this.model.get('reviews').each(function (m) {
      this.renderReview(m);
    }, this);
  },
  renderReview: function (review) {
    var reviewView = new ReviewView({ model: review });
    this.$('.reviews-list').append(reviewView.render().el);
  },
  submitReview: function(){
    this.model.get('reviews').add({
      name: this.$('#review-name-input').val(),
      text: this.$('#review-notes-input').val()
    })
  }

});
