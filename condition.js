var Condition = function(){
  var args = Array.prototype.slice.call(arguments);
  this.length = (typeof args[0] === 'number') ? args.shift() : undefined;
  this.types = args;
  this.func = undefined;
}

Condition.prototype.addFunc = function(func){
  this.func = func;
}

Condition.prototype.check = function(args){
  if (this.length && args.length !== this.length) {
    return false;
  } 
  else if (this.types.length) {
    var argument, type;
    for(var i = 0; i < args.length; i++){ // this should be replaced by deep equals
      argument = args[i];
      type = this.length ? this.types[i] : this.types[0]; // if no length is given, check arguments against single type
      if(typeof argument !== type){
        return false;
      }
    }
  }
  return this.func ? this.func(args) : true;
}