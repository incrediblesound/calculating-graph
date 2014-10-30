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
  var storeOutput = function(val, node, from){
    var key = node.name || node.id
    if(val === false){
      self.storeAverage(types, self.map[key], 0);
    } else {
      self.storeAverage(types, self.map[key], 1);
    }
    results[key] = results[key] || [];
    if(from){
      results[key].push({from: from.name || from.id, value: val});
    } else {
      results[key].push(val);
    }
  }
  forEach(this.nodes, function(node){
    types = self.generateTypes(args);
    output = node.input(args);
    storeOutput(output, node);
    if(!Array.isArray(output)){
      output = [output];
    }
    forEach(node.edges, function(edge){
      types = self.generateTypes(output);
      edge = self.getNode(edge);
      secondOutput = edge.input(output);
      storeOutput(secondOutput, edge, node);
    })
  })
  return results;
}

Graph.prototype.generateTypes = function(args){
  var result = [];
  for(var i = 0; i < args.length; i++){
    result.push(typeof args[i]);
  }
  return result;
}

Graph.prototype.storeAverage = function(types, store, num){
  store[types] = store[types] || [];
  store[types].push(num);
}

Graph.prototype.getMap = function(){
  var result = {}, self = this;
  var keys = Object.keys(this.map)
  var key;
  var avg = function(arr){
    var result = 0;
    forEach(arr, function(element){
      result += element;
    })
    return result/arr.length;
  }
  forEach(this.map, function(store, storeKey){
    forEach(store, function(typeSet, typeSetKey){
      result[storeKey] = result[storeKey] || {};
      result[storeKey][typeSetKey] = avg(typeSet);
    })
  })
  return result;
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