'use strict';

function BinarySearchTree (value) {
  this.value = value;
  this.children = [];
}

BinarySearchTree.prototype.addChild = function (node) {
  this.children.push(node);
  return true;
};