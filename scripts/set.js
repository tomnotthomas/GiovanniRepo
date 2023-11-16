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
  // console.log(arr);
  return arr;
};

Set.getIntersection = function () {
  let sets = [...arguments];
  if (sets.length > 2) {
    const intersection = [];
    for (let element in sets[0].storage) {
      if (sets.slice(1).every(set => set.contains(sets[0].storage[element]))) {
        intersection.push(sets[0].storage[element]);
      }
    }
    return intersection;
  }
};

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

// console.log(Set);

// const setex = new Set();
// console.log(setex);

module.exports = Set;


