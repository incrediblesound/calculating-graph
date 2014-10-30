calculating-graph
=================

A graph that returns values from nodes with complex conditional i/o paths

Lets start from the inside out:

Conditions
----------
A condition object takes a length number and a series of types. When you pass an array of arguments into its check function it first checks if the length of the arguments array matches the length property of the condition. Next it checks if the types of the arguments matches the types property of the condition. If no length is given the condition will assume there is only one type and check each argument against condition.types[0]. If all these conditions are met then the check function returns true and the arguments are passed on to the node function.

You can add a function to the condition object with the addFunc() method. If there is a function on the condition it will return the result of invoking that function with the argments as a last check instead of returning true.

Nodes
-----
Each node has a node function and a condition object. When the input method of the node is run with a set of arguments, it first puts those arguments into the check method of the condition object. If the check method returns true, it passes the arguments into the node function. The input method will return false if the check method fails, otherwise it will return the result of the node function. If you want your node to process the arguments no matter how many there are or what type they are, you simply don't pass arguments to the condition object that you create with the node:
```javascript
var node = new Node(new Condition(), function(args){ return args })
// this node returns whatever arguments it is given
```

Graph
-----
The graph has an input function that takes any amount of arguments and passes them into the input function of every node in the graph. The graph acucmulates the outputs in a object which is returned at the end, and stores an object with input types mapped to proportion of false outputs.

Lets say we create three nodes like this:

<strong>("add")</strong> condition: this node only accepts two numbers, func: return sum of two numbers    
<strong>("concat")</strong> condition: this node only accepts two strings, func: return concat of two strings    
<strong>("square")</strong> condition: this node only accepts one number, func: return square of one number

If we add these three nodes to the graph, then we see this behavior:
```javascript
graph.input(3)
```
This input results in the following object:
```javascript
{
add: [ false ],
concat: [ false ],
square: [ 9 ]
}
// lets try two numbers:
graph.input(3, 3)
{
add: [ 6 ],
concat: [ false ],
square: [ false ]
}

/// and our graph.getMap() function returns this:
{
add: {
  number: 0,
  number, number: 1,
  },
concat: {
  number: 0,
  number, number: 0
  },
square: {
  number: 0,
  number, number: 0
  }
}
```
There is also the ability to add one-directional connections to the graph. Lets say we want the result of every addition to be squared, we would simply do this:
```javascript
graph.connect('add','square');
graph.input(3, 3);
```
This time our result is a little different:
```javascript
{
add: [ 6 ],
concat: [ false ],
square: [ { from: 'add', value: 36 }, false ]
}
```
The return value from add was passed to the square node via the one-way connection, and the result is included in the output object with some additional info about the origin of the input value.
