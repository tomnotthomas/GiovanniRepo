'use strict';

function Set () {
  this.storage = {};
  this.count = 0;
}

Set.prototype.add = function (value) {
  if (!this.contains(value))
    {this.storage[this.count] = value; this.count++; return true};
};

Set.prototype.contains = function (value) {
  return Object.values(this.storage).includes(value);
};

Set.prototype.remove = function (value) {
  if (this.contains(value)) {
  delete this.storage[Object.entries(this.storage).findIndex(element=> element[1]===value)];
  return true;
  }
};

module.exports = Set;
