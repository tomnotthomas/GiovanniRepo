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
// Tree.prototype.contains = function (value) {
  
//   // If value is found in this node return true
//   if (this.value === value) return true;
//   console.log(this.children);

//   // Else loop over this node's children
//   for (let child of this.children) {
//     // If recursive call on child is true then return true
//     if (child.contains(value)) return true;
//   }

//   // If value hasn't been found return false
//   return false;
// };

// Non-Recursive Version
Tree.prototype.contains = function (value) {
  
  if (this.value === value) return true;

  // Declares Initial Node, variable to keep track of index in children arrays
  let node = this;
  let lastIndex = 0;
  let endNotReached = true;
  let nodeTrack = [];
  if (node.value === value) return true;
  nodeTrack.push([node, 0]);

  while (endNotReached) {

    while (hasChildren()) {
      // stepDown(); If the node has children go down and add new node to track
      node = node.children[nextChild()];
      nodeTrack.push([node, 0]);
      if (node.value === value) return true;
    }
    
    let noNextChild = true;
    while (noNextChild && node !== this) {
      nodeTrack.pop();
      node = nodeTrack[nodeTrack.length-1][0];
      nodeTrack[nodeTrack.length-1][1]++;

      if (node.children[nextChild()]) {
        noNextChild = false;
      }
    }

    if (noNextChild === true && node === this) {return false}
    
  }

  function nextChild () {
    return nodeTrack[nodeTrack.length-1][1];
  }

  function hasChildren () {
    return node.children.length > 0 || false;
  }    
  
  //return false;
};

module.exports = Tree;
