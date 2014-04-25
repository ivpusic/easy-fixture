'use strict';

var manager = null;

module.exports = {
  Base: require('./lib/base'),

  use: function (fixtureManager) {
    if (!fixtureManager || !fixtureManager._save || !fixtureManager._load) {
      throw new Error('Plase provide instance of Base fixture class, with implemented interface.');
    }

    manager = fixtureManager;
  },

  save: function () {
    return manager._save();
  },

  load: function () {
    return manager._load();
  }
};
