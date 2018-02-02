var BeerView = Backbone.View.extend({

  className: 'beer',

  events: {
    'click .edit': 'acceptEdits',
    'click .remove': 'removeBeer',
    'keyup .beer-name': 'resolveEdit'
  },

  initialize: function(){
    //listen for change to edit mode.
    this.listenTo(this.model, 'change:editMode', this.toggleEditMode)
    this.listenTo(this.model, 'change:name', this.render)
  },

  template: Handlebars.compile($('#beer-template').html()),

  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  },
  acceptEdits: function(){
    this.model.set('editMode', true)
  },
  toggleEditMode: function(){
    this.$el.toggleClass('editing');
    this.$('#edit-beer-name').focus();
  },
  removeBeer: function(){
    appModel.get('beers').remove(this.model);
    console.log(appModel.get('beers'))
  },
  resolveEdit: function(e){
    console.log('resolving edit')
    if (e.keyCode === 13){
      this.$input = this.$('#edit-beer-name').val();
      this.model.set('name', this.$input);
      this.model.set('editMode', false);
    } else if (e.keyCode === 27){
      this.model.set('editMode', false);
    }
  }
})
