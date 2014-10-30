var Node = function(condition, func){
  this.id = null;
  this.condition = condition;
  this.func = func;
  this.edges = [];
}

Node.prototype.addEdge = function(node){
  this.edges.push(node);
}

Node.prototype.input = function(args){
  var result;
  if(this.condition.check(args)){
    result = this.func(args);
    return result;
  } else {
    return false;
  }
}