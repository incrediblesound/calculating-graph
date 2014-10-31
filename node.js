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
  return (this.condition.check(args)) ? this.func(args) : false
}