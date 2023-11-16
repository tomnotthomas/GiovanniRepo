'use strict';

function Set (name = 'no-name') {
  this.storage = {};
  this.count = 0;
  Set._sets.push([name, this]);
}

Set._sets = [];

Set.containedBy = function (value) {
  const arr = [];
  for (let element of Set._sets) {
    if (element[1].contains(value)) {
      arr.push(element);
      // console.log(element[1].storage);
    }
  }
  console.log(arr);
  return arr;
};

// Set.getIntersection(...sets) {

// };

Set.prototype.add = function (value) {
  if (!this.contains(value)) {
    this.storage[this.count] = value; 
    this.count++; 
    return true;
  }
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

console.log(Set);

const setex = new Set();
console.log(setex);

module.exports = Set;


