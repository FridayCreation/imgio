(function() {
  'use strict';
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  web.Views.PicturesView = (function(_super) {
    __extends(PicturesView, _super);

    function PicturesView() {
      _ref = PicturesView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PicturesView.prototype.template = JST['app/scripts/templates/pictures.ejs'];

    PicturesView.prototype.defaults = {
      name: null
    };

    PicturesView.prototype.events = {
      'click .more': 'loadMore'
    };

    PicturesView.prototype.initialize = function(models, options) {
      this.name = models.name;
      return this.collection.on('reset', this.render, this);
    };

    PicturesView.prototype.render = function() {
      return this.collection.forEach(this.addOne, this);
    };

    PicturesView.prototype.addOne = function(item) {
      var pictureView;
      pictureView = new web.Views.PictureView({
        model: item
      });
      return $('#' + this.name).prepend(pictureView.render().el);
    };

    PicturesView.prototype.renderFrame = function() {
      this.$el.html(this.template({
        name: this.name
      }));
      return this;
    };

    PicturesView.prototype.loadMore = function() {
      return this.collection.loadMore();
    };

    return PicturesView;

  })(Backbone.View);

}).call(this);