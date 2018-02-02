var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .submit-beer': 'createBeer'
  },

  initialize: function () {
    this.$nameInput = $('#name-input');
    this.$styleInput = $('#style-input');
    this.$abvInput = $('#abv-input');
    this.$imgUrl = $('#img-input')
    this.listenTo(this.model.get('beers'), 'add', this.renderBeer);
    this.listenTo(this.model.get('beers'), 'remove', this.renderBeers)
    this.renderBeers();
  },

  createBeer: function () {
    this.model.get('beers').add({
      name: this.$nameInput.val(),
      style: this.$styleInput.val(),
      abv: this.$abvInput.val(),
      image_url: this.$imgUrl.val()
    });
  },

  renderBeer: function (beer) {
    var beerView = new BeerView({ model: beer });
    this.$('.beer-list').append(beerView.render().el);
  },

  renderBeers: function () {
    console.log('rendering beer list')
  this.$('.beer-list').empty();
  this.model.get('beers').each(function (m) {
    this.renderBeer(m);
  }, this);
}
});
