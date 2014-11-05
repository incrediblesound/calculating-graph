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
  var types, received = [];
  var output, secondOutput;
  var self = this;
  var results = {};
  var storeResult = function(val, node, from){
    var key = node.name || node.id
    results[key] = results[key] || [];
    if(from){
      results[key].push({from: from.name || from.id, value: val});
    } else {
      results[key].push(val);
    }
  };
  forEach(this.nodes, function(node){
    types = self.generateTypes(args);
    output = node.input(args);
    storeResult(output, node);
    self.storeOutput(args, output, node);
    forEach(results, function(result, key){
      if(key === node.name || key === node.id){
        forEach(result, function(val){
          if(typeof val === 'object' && val.value !== false){
            received.push(val.value);
          }
        })
      }
    })
    if(!Array.isArray(output)){
      output = [output];
    }
    output = output.concat(received);
    forEach(node.edges, function(edge){
      types = self.generateTypes(output);
      edge = self.getNode(edge);
      forEach(output, function(outputVal){
        if(outputVal !== false){
          secondOutput = edge.input([outputVal]);
          storeResult(secondOutput, edge, node);
          self.storeOutput(outputVal, secondOutput, edge, node);
        }
      })
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