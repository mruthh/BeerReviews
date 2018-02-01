var BeerModel = Backbone.Model.extend({
  defaults: function (){
    return {
      name: 'beer'
    }
  }
})


// createBeer: function () {
//   this.model.get('beers').add({
//     name: this.$(nameInput).val(),
//     style: this.$(styleInput).val(),
//     abv: this.$(abvInput).val(),
//     image_url: this.$(imgUrl).val()
//   });
