'use strict';

const helpers = require('./hash-table-helpers');

// These are your helpers, they're used to generate
// the storage and get the hash respectively. For more
// information check the "hash-table-helpers.js" file.
const Storage = helpers.Storage;
const hash = helpers.hash;

function HashTable (size) {
  this.storage = new Storage(size);
  this.size = size;
}

HashTable.prototype.insert = function (key, value) {
  let node = this.storage.get(hash(key, this.size));

  if (node) {

    if (key === node.key) {
      node.value = value;
      return true;
    }

    while (node.next) {
      node = node.next;
      if (key === node.key) {
        node.value = value;
        return true;
      }
    }

    node.next = {key, value};
    return true;
  } else {
    this.storage.set(hash(key, this.size), {key, value});
  }
  return true;
};

HashTable.prototype.retrieve = function (key) {
  let node = this.storage.get(hash(key, this.size));

  while (node) {
    if (key === node.key) {
      return node.value;
    } else {
      node = node.next;
    }
  }
  return undefined;
};

HashTable.prototype.remove = function (key) {
  // let node = this.storage.get(hash(key, this.size));

  // while (node) {
  //   if (key === node.key) {
  //     return node.value;
  //   } else {
  //     node = node.next;
  //   }
  // }
  // return undefined;
};


console.log(hash('hello', 2));
console.log(hash('world', 2));

const obj = {};
console.log(obj.value);

module.exports = HashTable;
