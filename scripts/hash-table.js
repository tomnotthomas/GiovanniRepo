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
  this.itemsStored = 0;
  this.slotsOccupied = 0;
  this.checkItemsActive = false; //!: Currently inactive. Set to true to switch.
  this.checkSlotsActive = true; //!: Currently active. Set to false to switch.
}

// IN REVIEW HE ADDED NEW DATA AT BEGINNING OF LINKLIST!
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
    this.itemsStored++;
    this.checkItemLoad();
    return true;
  } 
  
  else {
    this.storage.set(hash(key, this.size), {key, value});
    this.itemsStored++;
    this.slotsOccupied++;
    this.checkItemLoad(); 
    this.checkSlotLoad();
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
  let node = this.storage.get(hash(key, this.size));
  if (node) {
    if (key === node.key) {
      if (node.next) {
        this.storage.set(hash(key, this.size), node.next);
      } else {
        this.storage.set(hash(key, this.size), undefined);
        this.slotsOccupied--;
        this.checkSlotLoad();
      }
      this.itemsStored--;
      this.checkItemLoad();
      return true;
    } else {
      while (node.next) {
        if (key === node.next.key) {
          if (node.next.next) {
            node.next = node.next.next;
          } else {
            delete node.next;
          }
          this.itemsStored--;
          this.checkItemLoad();
          return true;
        }
        node = node.next;
      }
    }
  }
  return false;
};

HashTable.prototype.checkItemLoad = function () {
  const load = this.itemsStored / this.size;
  if (this.checkItemsActive === true) {
    load >= 0.75 ? this.resize(2)/* console.log('double me!') */ : load < 0.25 && this.size > 2 ? this.resize (0.5)/* console.log('half me!') */ : null; 
  }
};

HashTable.prototype.checkSlotLoad = function () {
  const load = this.slotsOccupied / this.size;
  if (this.checkSlotsActive === true) {
    load >= 0.75 ? this.resize(2)/* console.log('double me!') */ : load < 0.25 && this.size > 2 ? this.resize (0.5)/* console.log('half me!') */ : null; 
  }
};

HashTable.prototype.resize = function (factor) {
  // console.log('size:', this.size, 'itemsStored:', this.itemsStored);
  // for (let i = 0; i < this.size; i++) {
  //   console.log(this.storage.get(i));
  // }
  // Escape resizing trigger
  this.checkItemsActive = false;
  this.checkSlotsActive = false;  

  // Retrieve stack of nodes from current storage
  const stack = [];
  for (let i = 0; i < this.size; i++) {
    while (this.storage.get(i) !== undefined) {
      stack.push(this.storage.get(i));
      this.remove(stack[stack.length-1].key);
    }
  }

  this.size = this.size * factor;
  this.storage = new Storage(this.size);
  // this.itemsStored = 0;

  // Insert nodes from stack into new storage
  while (stack.length>0) {
    let node = stack.pop();
    // delete node.next; Not necessary since set does not add pointers to existing nodes but creates new nodes
    this.insert(node.key, node.value);
  }

  this.checkItemsActive = false; //!: Currently inactive. Set to true to switch.
  this.checkSlotsActive = true; //!: Currently active. Set to false to switch.
  // console.log('size:', this.size, 'itemsStored:', this.itemsStored);
  // for (let i = 0; i < this.size; i++) {
  //   console.log(this.storage.get(i));
  // }
};

// console.log ('size 2 hashes:');
// console.log ('hello:', hash('hello',2));
// console.log ('world:', hash('world',2));
// console.log ('red:', hash('red',2));
// console.log ('yellow:', hash('yellow',2));
// console.log ('orange:', hash('orange',2));
// console.log ('green:', hash('green',2));
// console.log ('why:', hash('why',2));
// console.log ('great:', hash('great',2));
// console.log ('dry:', hash('dry',2));
// console.log ('hide:', hash('hide',2));

// console.log ('size 4 hashes:');
// console.log ('hello:', hash('hello',4));
// console.log ('world:', hash('world',4));
// console.log ('red:', hash('red',4));
// console.log ('yellow:', hash('yellow',4));
// console.log ('orange:', hash('orange',4));
// console.log ('green:', hash('green',4));
// console.log ('why:', hash('why',4));
// console.log ('great:', hash('great',4));
// console.log ('dry:', hash('dry',4));
// console.log ('hide:', hash('hide',4));

// console.log ('size 8 hashes:');
// console.log ('hello:', hash('hello',8));
// console.log ('world:', hash('world',8));
// console.log ('red:', hash('red',8));
// console.log ('yellow:', hash('yellow',8));
// console.log ('orange:', hash('orange',8));
// console.log ('green:', hash('green',8));
// console.log ('great:', hash('great',8));
// console.log ('dry:', hash('dry',8));
// console.log ('why:', hash('why',8));
module.exports = HashTable;
