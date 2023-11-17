'use strict';

const should = require('chai').should();

const Set = require('../scripts/set.js');
const Tree = require('../scripts/tree.js');
const HashTable = require('../scripts/hash-table.js');

describe('Set', function () {

  let set;

  beforeEach(function () {
    Set._sets = [];
    set = new Set('first');
  });

  it('the class should provide an "add()" method', function () {
    set.should.not.have.ownProperty('add');
    set.add.should.be.a('function');
  });

  it('the class should provide a "contains()" method', function () {
    set.should.not.have.ownProperty('contains');
    set.contains.should.be.a('function');
  });

  it('the class should provide a "remove()" method', function () {
    set.should.not.have.ownProperty('remove');
    set.remove.should.be.a('function');
  });

  it('should add values, and check that the set contains them', function () {
    set.contains('hello').should.be.false;
    set.add('hello').should.be.true;
    set.contains('hello').should.be.true;
    set.add('world').should.be.true;
    set.contains('hello').should.be.true;
    set.contains('world').should.be.true;
  });

  it('should remove values, and check that the set does not contain them', function () {
    set.add('hello');
    set.add('world');
    set.contains('hello').should.be.true;
    set.contains('world').should.be.true;
    set.remove('hello');
    set.contains('hello').should.be.false;
    set.contains('world').should.be.true;
  });

  it('the class should provide a way to show what sets a value is contained by', function () {
    set.add('hello');
    set.add('why');
    let set2 = new Set('second');
    set2.add('hello');
    set2.add('world');
    Set.containedBy('hello').should.eql([['first', set],['second', set2]]);
    Set.containedBy('why').should.eql([['first', set]]);
    Set.containedBy('world').should.eql([['second', set2]]);
    Set.containedBy('none').should.eql([]);
  });

  it('the class should provide a way to show what sets a value is contained by', function () {
    set.add('hello');
    set.add('world');
    let set2 = new Set('second');
    set2.add('why');
    set2.add('hello');
    let set3 = new Set('third');
    set3.add('why');
    set3.add('world');
    set3.add('hello');
    Set.getIntersection(set,set2,set3).should.eql(['hello']);
    set3.remove('hello');
    Set.getIntersection(set,set2,set3).should.eql([]);
    Set.getIntersection(set,set2).should.eql(['hello']);
    should.equal(Set.getIntersection(set), undefined);
  });



});

describe('Tree', function () {

  let tree;

  beforeEach(function () {
    tree = new Tree();
  });

  it('the class should provide an "addChild()" method', function () {
    tree.should.not.have.ownProperty('addChild');
    tree.addChild.should.be.a('function');
  });

  it('the class should provide a "contains()" method', function () {
    tree.should.not.have.ownProperty('contains');
    tree.contains.should.be.a('function');
  });

  it('should add values, and check that the tree contains them', function () {
    tree = new Tree('hello');
    tree.contains('hello').should.be.true;
    tree.contains('world').should.be.false;
    const subTree1 = new Tree('world');
    const subTree2 = new Tree('codeworks');
    tree.addChild(subTree1).should.be.true;
    tree.addChild(subTree2).should.be.true;
    tree.contains('world').should.be.true;
    tree.contains('codeworks').should.be.true;
    const subSubTree1 = new Tree('today');
    const subSubTree2 = new Tree('tomorrow');
    subTree1.addChild(subSubTree1).should.be.true;
    subTree2.addChild(subSubTree2).should.be.true;
    tree.contains('amazing').should.be.false;
    tree.contains('today').should.be.true;
    tree.contains('tomorrow').should.be.true;
  });

});

describe('Hash table', function () {

  let hashTable;

  beforeEach(function () {
    hashTable = new HashTable(2);
  });

  it('each instance should have a "size" property', function () {
    hashTable.size.should.equal(2);
  });

  it('the class should provide an "insert()" method', function () {
    hashTable.should.not.have.ownProperty('insert');
    hashTable.insert.should.be.a('function');
  });

  it('the class should provide a "retrieve()" method', function () {
    hashTable.should.not.have.ownProperty('retrieve');
    hashTable.retrieve.should.be.a('function');
  });

  it('the class should provide a "remove()" method', function () {
    hashTable.should.not.have.ownProperty('remove');
    hashTable.remove.should.be.a('function');
  });

  it('should insert key / value pairs, and be able to retrieve them', function () {
    should.equal(hashTable.retrieve('hello'), undefined);
    hashTable.insert('hello', '2').should.be.true;
    hashTable.retrieve('hello').should.equal('2');
    hashTable.insert('hello', '1').should.be.true;
    should.equal(hashTable.retrieve('world'), undefined);
    hashTable.insert('world', '2');
    hashTable.insert('today', '3');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.retrieve('world').should.equal('2');
    hashTable.retrieve('today').should.equal('3');
  });

  it('should delete keys, and make sure that they return "undefined"', function () {
    hashTable.remove('hello').should.be.false;
    hashTable.insert('hello', '1');
    hashTable.insert('world', '2');
    hashTable.remove('hello').should.be.true;
    should.equal(hashTable.retrieve('hello'), undefined);
    hashTable.remove('hello').should.be.false;
    hashTable.remove('world').should.be.true;
    should.equal(hashTable.retrieve('world'), undefined);
  });

  it('should be able to insert and delete the same key / value pair several times ', function () {
    hashTable.insert('hello', '1');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.remove('hello').should.be.true;
    hashTable.insert('hello', '1');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.remove('hello').should.be.true;
    should.equal(hashTable.retrieve('hello'), undefined);
  });

  it('should be able auto-resize depending on slot occupation storage load ', function () {
    hashTable.size.should.equal(2);
    hashTable.insert('green', '1, 1');
    hashTable.insert('hello', '0, 0');
    hashTable.size.should.equal(4);
    hashTable.remove('hello');
    hashTable.remove('green');
    hashTable.size.should.equal(2);
    hashTable.insert('hello', '0, 0, 4');
    hashTable.insert('hide', '0, 2, 2');
    hashTable.size.should.equal(2);
    hashTable.insert('green', '1, 1, 1');
    hashTable.size.should.equal(4);
    hashTable.insert('great', '0, 3, 3');
    hashTable.size.should.equal(8);
    hashTable.remove('hello');
    hashTable.remove('green');
    hashTable.remove('hide');
    hashTable.size.should.equal(4);
    // for (let i = 0; i < hashTable.size; i++) {
    //   console.log(hashTable.storage.get(i));
    // }
  });
});
