/* global connect, describe, it, expect, should */

describe('connect()', function () {
  'use strict';
  var graph;
  var node1, node2, node3, node4;

  beforeEach(function () {
    graph = new Graph();
    node1 = new Node(new Condition(2, 'number', 'number'), 
      function(args){
        var a = args[0];
        var b = args[1];
        return a + b;
      })
    node2 = new Node(new Condition(2, 'string', 'string'),
      function(args){
        var a = args[0];
        var b = args[1];
        return a.concat(b);
      })
    node3 = new Node(new Condition(1, 'number'),
      function(args){
        var a = args[0];
        return a * a;
      })
    node3.condition.addFunc(function(args){
      return (args[0] < 10);
    })
    node4 = new Node(new Condition('number'), function(args){
      var result = 0;
      for(var i = 0; i < args.length; i++){
        result += args[i];
      }
      return result;
    })

    graph.insert(node1, 'add');
    graph.insert(node2, 'concat');
    graph.insert(node3, 'square');
    graph.insert(node4, 'sum');
    window.graph = graph;
    // end beforeEach
  });

  it('exists', function () {
    expect(connect).to.be.a('function');
  });

  it('does something', function () {
    expect(true).to.equal(false);
  });

  it('does something else', function () {
    expect(true).to.equal(false);
  });

  // Add more assertions here
});
