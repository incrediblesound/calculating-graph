var nodeLib = {
  'sumTwo': function(){
    return new Node(new Condition(2, 'number', 'number'), 
      function(args){
        var a = args[0];
        var b = args[1];
        return a + b;
      })
  },
  'square': function(){
    return new Node(new Condition(1, 'number'),
      function(args){
        var num = args[0];
        return num*num;
      })
  },
  'sumAll': function(){
    return new Node(new Condition('number'), 
      function(args){
        var result = 0;
        forEach(args, function(el){
          result += el;
        })
        return result;
      })
  },
  'divideBy': function(num){
    return new Node(new Condition(1, 'number'),
      function(args){
        var val = args[0];
        return val/num;
      })
  },
  'average': function(){
    return new Node(new Condition('number'),
      function(args){
        var result = 0;
        var length = args.length;
        forEach(args, function(el){
          result += el;
        })
        return result/length;
      })
  },
  'sort': function(){
    return new Node(new Condition('number'),
      function(args){
        var sorter = function(left, right) {
          var result = [];
          while(left.length && right.length){
            if(left[0] <= right[0]){
              result.push(left.shift());
            } else {
              result.push(right.shift());
            }
          }
          while(left.length) { result.push(left.shift()); }
          while(right.length) { result.push(right.shift()); }
          return result;
        };
        var mergeSort = function(array){
          if(array.length < 2) { return array; }
          var mid = Math.floor(array.length/2);
          var left = array.slice(0, mid);
          var right = array.slice(mid, array.length);
          return sorter(merge(left), merge(right));
        };
        return mergeSort(args);
      })
  },
  'max': function(){
    return new Node(new Condition('number'),
      function(args){
        var result;
        forEach(args, function(el){
          if(result === undefined){
            result = el;
          } 
          else if(el > result){
            result = el;
          }
        })
        return result;
      })
  },
  'min': function(){
    return new Node(new Condition('number'),
      function(args){
        var result;
        forEach(args, function(el){
          if(result === undefined){
            result = el;
          } 
          else if(el < result){
            result = el;
          }
        })
        return result;
      })
  },
  'circumference': function(){
    return new Node(new Condition('number'),
      function(args){
        var r = args[0];
        return Math.PI*(2*r);
      })
  },
  'combinations': function(){
    return new Node(new Condition(),
      function(args){
        return recombine(args);
        function recombine(arr){
          var result = [];
          function newLevel(combs, level, iteration){
            if(iteration === undefined){
              iteration = [];
            }
            if(level === arr.length){
              result.push(iteration);
              return;
            } else {
              forEach(combs, function(item){
                var newIteration = iteration.slice();
                newIteration.push(item);
                newLevel(combs, level+1, newIteration);
              })
            }
          }
          newLevel(arr, 0);
          return result;
        }
      })
  }
}