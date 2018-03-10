function Queue() { // first in, first out (FIFO)
    const content = [];
    this.list = function() { console.log(content) }; // list all queue item
    this.enqueue = function(element) { content.push(element) }; // put item to the queue
    this.dequeue = function() { return content.shift() }; // get the first item in the queue, remove it from the queue
    this.front = function() { return content[0] }; // get the first item in the queue, still let it be in the queue
    this.length = function() { return content.length }; // get queue length
    this.isEmpty = function() { return (content.length == 0) } // check if queue is empty
}

const myQueue = new Queue();
myQueue.enqueue('a');            
myQueue.enqueue('b');           
myQueue.enqueue('c');           
myQueue.list();                 // [ 'a', 'b', 'c' ]
console.log(myQueue.dequeue()); // a
console.log(myQueue.front());   // b
console.log(myQueue.length());  // 2
console.log(myQueue.isEmpty()); // false
myQueue.list();                 // [ 'b', 'c' ]

