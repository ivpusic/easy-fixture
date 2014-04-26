'use strict';

var Q = require('q');

var managers = [];

module.exports = {
  /**
   * If you want to write your own manager, plase extend this object
   */

  Base: require('./lib/base'),

  /**
   * Add fixture manager to list of managers.
   * When function save or load get executed, data will be loaded/saved
   * using each added fixture manager
   */

  use: function (fixtureManager) {
    if (!fixtureManager || !fixtureManager._save || !fixtureManager._load) {
      throw new Error('Plase provide instance of Base fixture class, with implemented interface.');
    }

    managers.push(fixtureManager);
  },

  /**
   * Collect data from multiple data sources,
   * and save it into multiple local files, based on configuration
   */

  save: function () {
    var reqs = managers.map(function (manager) {
      return manager._save();
    });

    return Q.all(reqs);
  },

  /**
   * Call _load method on each fixture manager,
   * in order to load fixtures from multiple files, and to save
   * data into multiple data destinations (databases)
   */

  load: function () {
    var reqs = managers.map(function (manager) {
      return manager._load();
    });

    return Q.all(reqs);
  },

  /**
   * Clear managers list
   */

  clear: function () {
    managers = [];
  }
};
