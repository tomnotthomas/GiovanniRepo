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

//   // Else loop over this node's children
//   for (let child of this.children) {
//     // If recursive call on child is true then return true
//     if (child.contains(value)) return true;
//   }

//   // If value hasn't been found return false
//   return false;
// };

// Non-Recursive Version
// Easier implementation would have been using a while loop to add all children to a queue and check them
Tree.prototype.contains = function (value) {
  // Check first node for value
  if (this.value === value) return true;

  // Declare Initial Node and array to track progress and allow backtracking and turning
  let node = this;
  let nodeTrack = [];

  // Place initial node in array
  nodeTrack.push([node, 0]);

  // Don't stop looping
  while (true) {

    // Loop to go down branches while checking for value
    while (hasChildren()) {
      // If the node has children go down and add new element to nodeTrack
      node = node.children[nextChild()];
      nodeTrack.push([node, 0]);
      if (node.value === value) return true;
    }
    
    // Once we reach the bottom
    // Loop to go up branches while checking for other children to explore
    // As soon as a new child is found break out of this loop and dive into its branch
    let noNextChild = true;
    while (noNextChild && node !== this) {
      nodeTrack.pop();
      node = nodeTrack[nodeTrack.length-1][0];
      nodeTrack[nodeTrack.length-1][1]++;

      if (node.children[nextChild()]) {
        noNextChild = false;
      }
    }

    // If there are no more children to explore and we are back to initial node return false
    if (noNextChild === true && node === this) {return false;}
    
  }

  function nextChild () {
    return nodeTrack[nodeTrack.length-1][1];
  }

  function hasChildren () {
    return node.children.length > 0 || false;
  }    
};

/* Nice Proper Way

Tree.prototype.contains = function (value) {
  if(this.value === value) return true;
  const stack = [...this.children];
  while (stack.length > 0) {
    let current = stack.pop();
    if (current.value === value) return true;
    stack.push(...current.children);
  }
  return false;
}

*/


module.exports = Tree;
