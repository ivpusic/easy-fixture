'use strict';

var Q = require('q');

var managers = [];

module.exports = {
  Base: require('./lib/base'),

  use: function (fixtureManager) {
    if (!fixtureManager || !fixtureManager._save || !fixtureManager._load) {
      throw new Error('Plase provide instance of Base fixture class, with implemented interface.');
    }

    managers.push(fixtureManager);
  },

  save: function () {
    var reqs = managers.map(function (manager) {
      return manager._save();
    });

    return Q.all(reqs);
  },

  load: function () {
    var reqs = managers.map(function (manager) {
      return manager._load();
    });

    return Q.all(reqs);
  }
};
