'use strict';

function Tree (value) {
  this.value = value;
  this.children = [];
}

Tree.prototype.addChild = function (node) {
  this.children.push(node);
  return true;
};

// Recursive Version
Tree.prototype.contains = function (value) {
  
  // If value is found in this node return true
  if (this.value === value) return true;
  console.log(this.children);

  // Else loop over this node's children
  for (let child of this.children) {
    // If recursive call on child is true then return true
    if (child.contains(value)) return true;
  }

  // If value hasn't been found return false
  return false;
};

module.exports = Tree;
