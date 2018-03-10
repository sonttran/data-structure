# Popular data structures implemented in Javascript

## Content
* [Stack](#stack)
* [Set](#set)
* [Queue](#queue)
* [Priority Queue](#pQueue)

### Stack <a name="stack"></a> 
![Stack](pics/stack.jpeg)
```javascript
    const Stack = function() {
        let count = 0;
        let content = {};
        this.push = function(value) { // add value on top of the stack
            content[count] = value;
            count++;
        };
        this.pop = function() { // remove value at top of the stack and return that value
            if(count === 0) { return undefined }
            count--;
            var popped = content[count];
            delete content[count];
            return popped;
        };
        this.length = function() { return count } // return number of values in stack
        this.top = function() {  // return the value on top of the stack
            if(count === 0 ) { return undefined }
            return content[count-1]
        }
        this.bottom = function() { // return the value at the bottom of the stack
            if(count === 0 ) { return undefined }
            return content['0']
        }
    }

    var myStack = new Stack();
    console.log(myStack.length());      // 0
    console.log(myStack.push('a'));     // undefined (push return no value)
    console.log(myStack.push('b'));     // undefined
    console.log(myStack.push('c'));     // undefined
    console.log(myStack.pop());         // c
    console.log(myStack.top());         // b
    console.log(myStack.bottom());      // a
    console.log(myStack.length());      // 2
```
* Javascript array object has all Stack data structure attributes and methods. However, we can always implement a stack data structure by ourself and add more property/method as we want.


### Set <a name="set"></a>
![Set](pics/set.png)
```javascript
const Set = function() {
    let set = [];
    this.exist = function(element) { // check if element is in set return true, else return false
        return (set.indexOf(element) !== -1)
    }
    this.add = function(element) { // add element to set if not exist, do not add if it exists
        if(!this.exist(element)) {
            set.push(element);
            return `${element} is added to set!`;
        }
    }
    this.list = function() { // list all element in set
        return set;
    }
    this.remove = function(element) { // remove an element if it's in set
        if(this.exist(element)) {
            set.splice(set.indexOf(element), 1);
            return `${element} is removed from set!`;
        } else { return `${element} is not in set!`; }
    }
    this.length = function() { // return number of element in set
        return set.length;
    }
    this.union = function(setC) { // return the union set of two sets
        let union = new Set();
        let setA = this.list();
        let setB = setC.list();
        for(let i = 0; i < setA.length; i++) {
            union.add(setA[i]);
        }
        for(let j = 0; j < setB.length; j++) {
            union.add(setB[j]);
        }
        return union;
    }
    this.intersect = function(setC) { // return a set of intersection of 2 sets
        let intersect = new Set();
        let setA = this;
        let setB = setC.list();
        for(let i = 0; i < setB.length; i++) {
            if(setA.exist(setB[i])) {
                intersect.add(setB[i])
            }
        }
        return intersect;
    }
    this.difference = function(setC) { // return a set of difference of 2 sets
        let setA = this;
        let difference = setA.union(setC);
        let setB = setA.intersect(setC).list();
        for(let i = 0; i < setB.length; i++) {
            difference.remove(setB[i]);
        }
        return difference;
    }
}

const mySet = new Set();
console.log(mySet.add('a'));                    // a is added to set!
console.log(mySet.exist('a'));                  // true
console.log(mySet.exist('b'));                  // false
console.log(mySet.list());                      // [ 'a' ]
console.log(mySet.add('b'));                    // b is added to set!
console.log(mySet.add('c'));                    // c is added to set!
console.log(mySet.remove('c'));                 // c is removed from set!
console.log(mySet.list());                      // [ 'a', 'b' ]
console.log(mySet.length());                    // 2
const mySet2 = new Set();
console.log(mySet2.add('a'));                   // a is added to set!
console.log(mySet2.add('g'));                   // g is added to set!
console.log(mySet2.add('h'));                   // h is added to set!
console.log(mySet2.list());                     // [ 'a', 'g', 'h' ]
console.log(mySet.union(mySet2).list());        // [ 'a', 'b', 'g', 'h' ]
console.log(mySet.intersect(mySet2).list());    // [ 'a' ]
console.log(mySet.difference(mySet2).list());   // [ 'b', 'g', 'h' ]
```


### Queue <a name="queue"></a> 
![Queue](pics/queue.jpg)
```javascript
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
```


### Priority Queue <a name="qQueue"></a> 
![Priority Queue](pics/pQueue.jpg)
```javascript
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
```