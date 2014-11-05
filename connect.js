var Graph = function(){
  this.nodes = [];
  this.count = 0;
  this.map = {};
}

Graph.prototype.insert = function(node, name){
  var id = this.count;
  node.id = id;
  node.name = name;
  this.map[name || id] = {};
  this.nodes.push(node);
  this.count++;
}

Graph.prototype.connect = function(source, target){
  sourceNode = this.getNode(source);
  sourceNode.addEdge(target);
}

Graph.prototype.input = function(){
  var args = Array.prototype.slice.call(arguments);
  var types;
  var output, secondOutput;
  var self = this;
  var results = {};
  forEach(this.nodes, function(node){
    types = self.generateTypes(args);
    output = node.input(args);
    self.storeOutput(args, output, node);
    if(!Array.isArray(output)){
      output = [output];
    }
    forEach(node.edges, function(edge){
      types = self.generateTypes(output);
      edge = self.getNode(edge);
      secondOutput = edge.input(output);
      self.storeOutput(output, secondOutput, edge, node);
    })
  })
  return results;
}

Graph.prototype.storeOutput = function(args, val, node, from){
  var key = node.name || node.id
  this.map[key] = this.map[key] || {};
  this.map[key][args] = this.map[key][args] || [];
  if(from){
    this.map[key][args].push({from: from.name || from.id, value: val});
  } else {
    this.map[key][args].push(val);
  }
}

Graph.prototype.generateTypes = function(args){
  var result = [];
  for(var i = 0; i < args.length; i++){
    result.push(typeof args[i]);
  }
  return result;
}

Graph.prototype.getMap = function(node){
  return node ? this.map[node] : this.map;
}

Graph.prototype.getNode = function(id){
  if(id === 'graph'){
    return this;
  } else {
    var result;
    forEach(this.nodes, function(node){
      if(node.id === id || node.name === id){
        result = node;
      }
    })
    return result;
  }
}

function forEach(obj, fn){
  if(Array.isArray(obj)){
    for(var i = 0; i < obj.length; i++){
      fn(obj[i], i);
    }
  } else {
    var keys = Object.keys(obj);
    for(var i = 0; i < keys.length; i++){
      fn(obj[keys[i]], keys[i]);
    }
  }
}