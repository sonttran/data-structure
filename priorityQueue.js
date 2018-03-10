function priorityQueue() { // Queue with highest priority get out first no matter when added
    const content = [];
    this.list = function() { console.log(content) }; // list all queue item
    this.dequeue = function() { return content.shift() }; // get the first item in the queue, remove it from the queue
    this.front = function() { return content[0] }; // get the first item in the queue, still let it be in the queue
    this.length = function() { return content.length }; // get queue length
    this.isEmpty = function() { return (content.length == 0) } // check if queue is empty
    this.enqueue = function(element) { // put item to the queue with priority
        if(this.isEmpty()) { return content.push(element) };
        var added = false;
        for(let i = 0; i < content.length; i ++) { // 1 is highest priority
            if(element[1] < content[i][1]) {
                content.splice(i, 0, element);
                added = true;
                break;
            }
        }
        if(!added) { content.push(element) }
    };
}

const myQueue = new priorityQueue();
myQueue.enqueue(['a', 2]);      
myQueue.enqueue(['b', 3]);          
myQueue.list();             // [ [ 'a', 2 ], [ 'b', 3 ] ]
myQueue.enqueue(['c', 4]);           
myQueue.list();             // [ [ 'a', 2 ], [ 'b', 3 ], [ 'c', 4 ] ]       
myQueue.enqueue(['d', 3]);    
myQueue.list();             // [ [ 'a', 2 ], [ 'b', 3 ], [ 'd', 3 ], [ 'c', 4 ] ]      
myQueue.enqueue(['e', 1]);    
myQueue.list();             // [ [ 'e', 1 ], [ 'a', 2 ], [ 'b', 3 ], [ 'd', 3 ], [ 'c', 4 ] ]    
console.log(myQueue.dequeue()); // [ 'e', 1 ]
console.log(myQueue.front());   // [ 'a', 2 ]
console.log(myQueue.length());  // 4
console.log(myQueue.isEmpty()); // false

