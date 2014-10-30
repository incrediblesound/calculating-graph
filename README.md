calculating-graph
=================

A graph that returns values from nodes with complex conditional i/o paths

Lets start from the inside out:

Conditions
----------
A condition object takes a length number and a series of types. When you pass an array of arguments into its check function it first checks if the length of the arguments array matches the length number of the condition. Next it checks if the types of the arguments matches the types of the condition. If all these conditions are met then the check function returns true.

You can add a function to the condition object with the addFunc() method. If there is a function on the condition it will return the result of invoking that function with the argments as a last check instead of returning true.

Nodes
-----
Each node has a function and a condition object. When the input method of the node is run with a set of arguments, it first puts those arguments into the check method of the condition object. If the check method returns true, it passes the arguments into the function on the node. The input method will return false if the check method fails, otherwise it will return the result of the node function.

Graph
-----
The graph has an input function that takes any amount of arguments and passes them into the input function of every node in the graph. It acucmulates the outputs in a object which is returned at the end. The graph also stores a map of input types to false outputs for each node, but that feature is in development as of now.
