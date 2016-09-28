'use strict';

var should = require('chai').should();

const Set = require('../scripts/set.js');
const Tree = require('../scripts/tree.js');
const HashTable = require('../scripts/hash-table.js');

describe('Set', function () {

  let set;

  beforeEach(function () {
    set = new Set();
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
    const subTree = new Tree('world');
    tree.addChild(subTree).should.be.true;
    tree.contains('world').should.be.true;
    const subSubTree = new Tree('today');
    subTree.addChild(subSubTree).should.be.true;
    tree.contains('today').should.be.true;
  });

});

describe('Hash table', function () {

  let hashTable;

  beforeEach(function () {
    hashTable = new HashTable(10);
  });

  it('each instance should have a "size" property', function () {
    hashTable.size.should.equal(10);
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
    hashTable.insert('hello', 'world').should.be.true;
    hashTable.retrieve('hello').should.equal('world');
    should.equal(hashTable.retrieve('world'), undefined);
    hashTable.insert('world', 'hello');
    hashTable.retrieve('world').should.equal('hello');
  });

  it('should delete keys, and make sure that they return "undefined"', function () {
    hashTable.remove('hello').should.be.false;
    hashTable.insert('hello', 'world');
    hashTable.insert('world', 'hello');
    hashTable.remove('hello').should.be.true;
    should.equal(hashTable.retrieve('hello'), undefined);
    hashTable.remove('hello').should.be.false;
    hashTable.remove('world').should.be.true;
    should.equal(hashTable.retrieve('world'), undefined);
  });

  it('should be able to insert and delete the same key / value pair several times ', function () {
    hashTable.insert('hello', 'world');
    hashTable.retrieve('hello').should.equal('world');
    hashTable.remove('hello').should.be.true;
    hashTable.insert('hello', 'world');
    hashTable.retrieve('hello').should.equal('world');
    hashTable.remove('hello').should.be.true;
    should.equal(hashTable.retrieve('hello'), undefined);
  });

});
