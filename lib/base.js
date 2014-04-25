'use strict';

function Base() {
  if (this.constructor === Base) {
    throw new Error('Can\'t instantiate abstract class!');
  }

  this.config = {};
}

/**
 * Purpose of this method is to load data from some local file
 * into some database destination.
 */

Base.prototype._load = function () {
  throw new Error('Cannot call abstract method!');
};

/**
 * Purpose of this method is to collect data from some data source, and save
 * collected data to some local file.
 *
 * User should be able to load data info database from created file.
 */

Base.prototype._save = function () {
  throw new Error('Cannot call abstract method!');
};

module.exports = Base;
