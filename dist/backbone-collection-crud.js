// Generated by CoffeeScript 1.4.0

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    return define(['underscore', 'backbone'], factory);
  } else if (typeof exports !== "undefined" && exports !== null) {
    return module.exports = factory(require('underscore'), require('backbone'));
  } else {
    return factory(root._, root.Backbone);
  }
})(this, function(_, Backbone) {
  var wrapError;
  wrapError = function(model, options) {
    var error;
    error = options.error;
    return options.error = function(resp) {
      if (typeof error === "function") {
        error(model, resp, options);
      }
      return model.trigger('error', model, resp, options);
    };
  };
  return _.each(['save', 'destroy'], function(method) {
    return Backbone.Collection.prototype[method] = function(options) {
      var success,
        _this = this;
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) {
        options.parse = true;
      }
      success = options.success;
      options.success = function(resp) {
        var models;
        models = method === 'save' ? resp : [];
        _this[options.reset ? {
          'reset': 'set'
        } : void 0](models, options);
        if (typeof success === "function") {
          success(_this, resp, options);
        }
        return _this.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync((method === 'save' ? 'create' : 'delete'), this, options);
    };
  });
});
