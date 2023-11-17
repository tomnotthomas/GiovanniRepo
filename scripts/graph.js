// Extra Credit: implement an undirected unweighted graph using ES6 classes

class Graph {
  constructor (nameOfGraph) {
    this.name = nameOfGraph;
    this.adjacencyList = [];
  }

  addVertix (name) {
    if (typeof name !== 'string') throw new Error('Name must be a string!');
    this.adjacencyList.push({name, next : null});
    return true;
  }
  
  _establishFriendship (person, person2) {
    this._addFriendToList(person, person2);
    this._addFriendToList(person2, person);
    return true;
  }

  _addFriendToList (target, friend) {
    let list;
    for (let person of this.adjacencyList) {
      if (person.name === target) list = person;
    }
    console.log(list);

  }
}

const network = new Graph('CodeworksPeople');
network.addVertix('Arun');
network.addVertix('Aija');
console.log(network);
network._establishFriendship ('Arun', 'Aija');


module.exports = Graph;

let obj = {};
obj = {};