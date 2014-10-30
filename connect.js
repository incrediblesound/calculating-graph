var Graph = function(){
  this.nodes = [];
  this.count = 0;
  this.map = {};
}

var Condition = function(){
  var args = Array.prototype.slice.call(arguments);
  this.length = args.shift();
  this.types = args;
  this.func = undefined;
}

Condition.prototype.addFunc = function(func){
  this.func = func;
}

Condition.prototype.check = function(args){
  if(this.length && args.length !== this.length){
    return false;
  } else {
    var argument, type;
    for(var i = 0; i < args.length; i++){ // this should be replaced by deep equals
      argument = args[i];
      type = this.types[i];
      if(typeof argument !== type){
        return false;
      }
    }
    return this.func ? this.func(args) : true;
  }
}

var Node = function(condition, func){
  this.id = null;
  this.condition = condition;
  this.func = func;
  this.edges = [];
}

Node.prototype.addEdge = function(node){
  if(this.edges.indexOf(node.id) === -1){
    this.edges.push(node.id);
    return true;
  } else {
    return false;
  }
}

Node.prototype.input = function(args){
  if(this.condition.check(args)){
    return this.func(args);
  } else {
    return false;
  }
}

Graph.prototype.insert = function(node){
  var id = this.count;
  node.id = id;
  this.map[id] = {};
  this.nodes.push(node);
  this.count++;
}

Graph.prototype.connect = function(source, target){
  sourceNode.addEdge(target);
  targetNode.addEdge(source);
}

Graph.prototype.input = function(){
  var args = Array.prototype.slice.call(arguments);
  var node, output;
  var results = {};
  for(var i = 0; i < this.nodes.length; i++){
    node = this.nodes[i];
    output = node.input(args);
    if(output === false){
      this.storeAverage(args, this.map[node.id], 0);
    } else {
      this.storeAverage(args, this.map[node.id], 1);
    }
    results[node.id] = output;
  }
  return results;
}

Graph.prototype.storeAverage = function(args, store, num){
  var arr = [];
  for(var i = 0; i < args.length; i++){
    arr.push(typeof args[i]);
  }
  store[arr] = store[arr] ? ((store[arr] + num) / 2) : num;
}