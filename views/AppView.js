var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .submit-beer': 'createBeer'
  },

  initialize: function () {
    this.$nameInput = this.$('#name-input');
    this.$styleInput = this.$('#style-input');
    this.$abvInput = this.$('#abv-input');
    this.$imgUrl = this.$('#img-input');
    this.detailView = null;

    this.$beerList = this.$('.beer-list');

    this.listenTo(this.model.get('beers'), 'add', this.renderBeer);

    this.listenTo(this.model, 'change:show_reviews', this.renderPage);

    this.listenTo(this.model, 'change:current_beer', this.renderDetailView);

    this.listenTo(this.model.get('beers'), 'reset', this.renderBeers);

    this.listenTo(this.model.get('beers'), 'destroy', this.renderBeers)

    this.renderBeers();
  },

  renderPage: function () {
    this.$('.reviews-container').toggleClass('show', this.model.get('show_reviews'));
    this.$('.beers-container').toggleClass('show', !this.model.get('show_reviews'));
  },

  renderDetailView: function () {
    if (this.detailView) {
      this.detailView.remove();
    }
    this.detailView = new BeerDetailView({ model: this.model.get('current_beer')});
    this.$('.reviews-container').append(this.detailView.render().el);
  },

  createBeer: function () {
    this.model.get('beers').create({
      name: this.$('#name-input').val(),
      style: this.$('#style-input').val(),
      abv: parseInt(this.$('#abv-input').val()),
      image_url: this.$('#img-input').val()
    }, { wait: true });
  },

  renderBeer: function (beer) {
    var beerView = new BeerView({ model: beer });
    this.$beerList.append(beerView.render().el);
  },

  renderBeers: function () {
    this.$beerList.empty()
    this.model.get('beers').each(function (m) {
      this.renderBeer(m);
    }, this);
  }
});
