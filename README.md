# Popular data structures implemented in Javascript

## Content
* [Stack](#stack)
* [Set](#set)
* [Queue](#queue)
* [Priority queue](#pQueue)
* [Binary search tree](#btree)
* [Hash tables](#htable)
* [Map](#map)
* [Linked list](#llist)
* [Trie](#trie)
* [Heap](#heap)
* [Graph](#graph)
* [Big O notation](#bigo)

### Stack <a name="stack"></a> 
![Stack](pics/stack.jpeg)
```javascript
    var myStack = new Stack();
    console.log(myStack.length());      // 0
    console.log(myStack.push('a'));     // undefined (push return no value)
    console.log(myStack.push('b'));     // undefined
    console.log(myStack.push('c'));     // undefined
    console.log(myStack.pop());         // c
    console.log(myStack.top());         // b
    console.log(myStack.bottom());      // a
    console.log(myStack.length());      // 2
    
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
```
* Javascript array object has all Stack data structure attributes and methods. However, we can always implement a stack data structure by ourself and add more property/method as we want.


### Set <a name="set"></a>
![Set](pics/set.png)
```javascript
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
```


### Queue <a name="queue"></a> 
![Queue](pics/queue.jpg)
```javascript
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
    
    function Queue() { // first in, first out (FIFO)
        const content = [];
        this.list = function() { console.log(content) }; // list all queue item
        this.enqueue = function(element) { content.push(element) }; // put item to the queue
        this.dequeue = function() { return content.shift() }; // get the first item in the queue, remove it from the queue
        this.front = function() { return content[0] }; // get the first item in the queue, still let it be in the queue
        this.length = function() { return content.length }; // get queue length
        this.isEmpty = function() { return (content.length == 0) } // check if queue is empty
    }
```


### Priority Queue <a name="pQueue"></a> 
![Priority Queue](pics/pQueue.jpg)
```javascript
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
    
    function priorityQueue() { // Queue where item with highest priority get out first no matter when added
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
```


### Binary search tree <a name="btree"></a>
![Binary search tree](pics/btree.JPG)
* Search item in tree `fast` __O(log n)__, find `min` and `max`, `inOrder`, `preOrder`, `postOrder`, `levelOrder`
* `preOrder` used when need to explore the __roots__ before inspecting any leaves
* `postOrder` used when need to explore all the __leaves__ before any nodes
* `inOrder` used when need to __flatten__ the tree back into its sequence (bottom up)
* `levelOrder` used when need to inspect __nodes at height level__
```javascript
    const util = require('util')

    class Node {
        constructor(data, left = null, right = null) {
            this.data = data;
            this.left = left;
            this.right = right;
        } 
    }

    class binarySearchTree {
        constructor() { this.root = null }
        add(data) { // add node to binary tree
            const node = this.root;
            if(this.root === null) { this.root = new Node(data) } else {
                searchLeaf(node);
                function searchLeaf(node) {
                    if(data < node.data) {
                        if(node.left === null) { return node.left = new Node(data) }
                        searchLeaf(node.left);
                    } else if(data > node.data) {
                        if(node.right === null) { node.right = new Node(data) }
                        searchLeaf(node.right);
                    } else { return null }
                }
            }
        }
        findMin() { // find min value in binary tree
            let current = this.root;
            while(current.left !== null) { current = current.left }
            return current.data;
        }
        findMax() { // find max value in binary tree
            let current = this.root;
            while(current.right !== null) { current = current.right }
            return current.data;
        }
        exist(data) { // check if a data is in binary tree
            let current = this.root;
            while(current) { 
                if(current.data === data) { return true }
                else if(current.data > data) { current = current.left }
                else { current = current.right }
            }
            return false
        }
        remove(data) { // remove a node from binary tree
            this.root = removeNode(this.root, data);
            function removeNode(node, data) {
                if(node == null) {  return null } // root node/tree has nothing in it
                if(data < node.data) { // not match, move to left
                    node.left = removeNode(node.left, data);
                } else if(data > node.data) { // not match, move to right
                    node.right = removeNode(node.right, data);
                } else { // found matching node
                    if(node.left === null && node.right === null) { return null } // no children
                    if(node.left === null) { return node.right } // has right child
                    if(node.right === null) { return node.left } // has left child
                    let rightThenFarthestLeft = node.right; // has both left, right child
                    while(rightThenFarthestLeft.left !== null) {
                        rightThenFarthestLeft = rightThenFarthestLeft.left;
                    }
                    node.data = rightThenFarthestLeft.data;
                    removeNode(node.right, rightThenFarthestLeft.data);
                }
                return node;
            }
        }
        findMinHeight(node = this.root) { // get min height of tree
            if (node == null) { return -1 }
            let left = this.findMinHeight(node.left);
            let right = this.findMinHeight(node.right);
            if (left < right) { return left + 1 } 
            else { return right + 1 }
        }
        findMaxHeight(node = this.root) { // get max height of tree
            if (node == null) { return -1 }
            let left = this.findMaxHeight(node.left);
            let right = this.findMaxHeight(node.right);
            if (left < right) { return right + 1 } 
            else { return left + 1 }
        }
        isBalanced() { // check if tree is balanced
            return (this.findMinHeight() >= this.findMaxHeight() - 1)
        }
        inOrder() { // traverse tree to array min -> max
            if (this.root == null) { return null } else {
                var result = new Array();
                traverseInOrder(this.root);
                return result;
                function traverseInOrder(node) {       
                    node.left && traverseInOrder(node.left);
                    result.push(node.data);
                    node.right && traverseInOrder(node.right);
                }
            };
        }
        bottomUp() { return this.inOrder() } // synonym of inOrder 
        topDown() { // traverse tree to array max -> min
            if (this.root == null) {
                return null;
            } else {
                var result = new Array();
                traverseInOrder(this.root);
                return result;
                function traverseInOrder(node) {       
                    node.right && traverseInOrder(node.right);
                    result.push(node.data);
                    node.left && traverseInOrder(node.left);
                }
            };
        }
        preOrder() {
            if (this.root == null) { return null } else {
                var result = new Array();
                function traversePreOrder(node) {
                    result.push(node.data);
                    node.left && traversePreOrder(node.left);
                    node.right && traversePreOrder(node.right);
                };
                traversePreOrder(this.root);
                return result;
            };
        }
        postOrder() {
            if (this.root == null) { return null } else {
                var result = new Array();
                function traversePostOrder(node) {
                    node.left && traversePostOrder(node.left);
                    node.right && traversePostOrder(node.right);
                    result.push(node.data);
                };
                traversePostOrder(this.root);
                return result;
            }
        }
        levelOrder() {
            let result = [];
            let Q = []; 
            if (this.root != null) {
                Q.push(this.root);
                while(Q.length > 0) {
                    let node = Q.shift();
                    result.push(node.data);
                    if (node.left != null) {
                        Q.push(node.left);
                    };
                    if (node.right != null) {
                        Q.push(node.right);
                    };
                };
                return result;
            } else {
                return null;
            };
        };
    }


    var myBt = new binarySearchTree();
    myBt.add(4);
    myBt.add(1);
    myBt.add(8);
    myBt.add(0.5);
    myBt.add(2);
    myBt.add(1.6);
    myBt.add(2.2);
    myBt.add(1.4);
    myBt.add(1.7); 
    console.log(util.inspect(myBt, {showHidden: false, depth: null}));
    //    {
    //        root    : {
    //            data    : 4,
    //            left    : {
    //                data    : 1,
    //                left    : { 
    //                    data: 0.5, 
    //                    left: null, 
    //                    right: null 
    //                },
    //                right   : {
    //                    data    : 2,
    //                    left    : {
    //                        data    : 1.6,
    //                        left    : { 
    //                            data    : 1.4, 
    //                            left    : null, 
    //                            right   : null 
    //                        },
    //                        right   : { 
    //                            data    : 1.7, 
    //                            left    : null, 
    //                            right   : null 
    //                        } 
    //                    },
    //                    right: { 
    //                        data: 2.2, 
    //                        left: null, 
    //                        right: null 
    //                    } 
    //                } 
    //            },
    //            right   : { 
    //                data: 8, 
    //                left: null, 
    //                right: null 
    //            } 
    //        } 
    //    }
    console.log(myBt.findMin());        // 0.5
    console.log(myBt.findMax());        // 8
    console.log(myBt.exist(5));         // false
    console.log(myBt.exist(2.2));       // true
    console.log(myBt.findMinHeight());  // 1
    console.log(myBt.findMaxHeight());  // 4 
    console.log(myBt.inOrder());        // [ 0.5, 1, 1.4, 1.6, 1.7, 2, 2.2, 4, 8 ]
    console.log(myBt.bottomUp());       // [ 0.5, 1, 1.4, 1.6, 1.7, 2, 2.2, 4, 8 ] 
    console.log(myBt.isBalanced());     // false
    console.log(myBt.topDown());        // [ 8, 4, 2.2, 2, 1.7, 1.6, 1.4, 1, 0.5 ]
    console.log(myBt.preOrder());       // [ 4, 1, 0.5, 2, 1.6, 1.4, 1.7, 2.2, 8 ]
    console.log(myBt.postOrder());      // [ 0.5, 1.4, 1.7, 1.6, 2.2, 2, 1, 8, 4 ]
    console.log(myBt.levelOrder());     // [ 4, 1, 8, 0.5, 2, 1.6, 2.2, 1.4, 1.7 ]
    console.log(myBt.remove(1));
    console.log(util.inspect(myBt, {showHidden: false, depth: null}));
    //    {
    //        root    : {
    //            data    : 4,
    //            left    : {
    //                data    : 1.4,
    //                left    : { 
    //                    data    : 0.5, 
    //                    left    : null, 
    //                    right   : null 
    //                },
    //                right   : { 
    //                    data    : 2, 
    //                    left    : {
    //                        data    : 1.6,
    //                        left    : null,
    //                        right   : { 
    //                            data    : 1.7, 
    //                            left    : null, 
    //                            right   : null 
    //                        }
    //                    },
    //                    right   : { 
    //                        data    : 2.2, 
    //                        left    : null, 
    //                        right   : null 
    //                    } 
    //                } 
    //            },
    //            right   : { 
    //                data    : 8, 
    //                left    : null, 
    //                right   : null 
    //            } 
    //        } 
    //    }
```

### Hash tables<a name="htable"></a>
![Hash table](pics/htable.png)
* The average time for each look up is not tied to the number of elements stored in the table
* Time complexity for `search`, `insert` and `delete` is `O(1)`
* But time to add an element is longer, vary to table size
```javascript
    var hash = (string, max) => { // return hash number 
        var hash = 0;
        for (var i = 0; i < string.length; i++) {
            hash += string.charCodeAt(i);
        }
        return hash % max; // simple hash function return value from 0 to max
    };

    let HashTable = function() {
        let storage = [];
        const storageLimit = 4; // define hash table size
        this.print = function() { console.log(storage) }
        this.add = function(key, value) { // add [key, value] to hash table
            var index = hash(key, storageLimit);
            if (storage[index] === undefined) {
                storage[index] = [
                    [key, value]
                ];
            } else {
                var inserted = false;
                for (var i = 0; i < storage[index].length; i++) { // collision will be stored in same hash position
                    if (storage[index][i][0] === key) {
                        storage[index][i][1] = value;
                        inserted = true;
                    }
                }
                if (inserted === false) {
                    storage[index].push([key, value]);
                }
            }
        };
        this.remove = function(key) { // remove [key, value] from hash table
            var index = hash(key, storageLimit);
            if (storage[index].length === 1 && storage[index][0][0] === key) {
                delete storage[index];
            } else {
                for (var i = 0; i < storage[index].length; i++) { // check if there is collision
                    if (storage[index][i][0] === key) {
                        delete storage[index][i];
                    }
                }
            }
        };
        this.lookup = function(key) { // lookup and return [key, value] in hash table
            var index = hash(key, storageLimit);
            if (storage[index] === undefined) {
                return undefined;
            } else {
                for (var i = 0; i < storage[index].length; i++) { // check if there is collision
                    if (storage[index][i][0] === key) {
                        return storage[index][i][1];
                    }
                }
            }
        };

    };


    console.log(hash('quincy', 10)) // 5
    let ht = new HashTable();
    ht.add('beau', 'person');
    ht.add('fido', 'dog');
    ht.add('rex', 'dinosour');
    ht.add('tux', 'penguin')
    console.log(ht.lookup('tux'))   // penguin
    ht.print();                     // [ <1 empty item>,[ [ 'beau', 'person' ], [ 'tux', 'penguin' ] ], [ [ 'fido', 'dog' ] ], [ [ 'rex', 'dinosour' ] ] ]
```

### Map<a name="map"></a>
![Map](pics/map.png)
* In Javascript, object is map
```javascript
    let myMap = function() {
        this.collection = {};
        this.count = 0;
        this.size = function() { // return number of total item in map
            return this.count;
        };
        this.set = function(key, value) { // add (key, value) pair to map
            this.collection[key] = value;
            this.count++;
        };
        this.has = function(key) { // check if map contains a given key
            return (key in this.collection);
        };
        this.get = function(key) { // get value given key
            return (key in this.collection) ? this.collection[key] : null;
        };
        this.delete = function(key) { // delete value given key
            if (key in this.collection) {
                delete this.collection[key];
                this.count--;
            }
        };
        this.values = function() { // list all values in map
            let result = new Array();
            for (let key of Object.keys(this.collection)) {
                result.push(this.collection[key]);
            };
            return (result.length > 0) ? result : null;
        };
        this.clear = function() { // delete all key value pairs in map
            this.collection = {};
            this.count = 0;
        };
        this.log = function() { // log the whole map out (for learning purpose)
            console.log(this.collection);
        }
    };

    let map = new myMap();
    map.set('arms', 2);
    map.set('fingers', 10);
    map.set('eyes', 2);
    map.set('belley button', 1);

    console.log(map.log());             // { arms: 2, fingers: 10, eyes: 2, 'belley button': 1 }
    console.log(map.get('fingers'));    // 10
    console.log(map.size());            // 4
    console.log(map.values());          // [ 2, 10, 2, 1 ]

    let map2 = new myMap();
    map2.set('hands', 'right');
    console.log(map2.values());         // [ 'right' ]
    console.log(map2.has('hands'));     // true

    let keyObj = {},
        keyFunc = function() {};

    map2.set('hello', 'string value');
    map2.set(keyObj, 'obj value');
    map2.set(keyFunc, 'func value');
    map2.set(NaN, 'NaN value')

    console.log(map2.size);             // [Function]

    console.log(map2.get('hello'));     // string value
    console.log(map2.get(keyObj));      // obj value
    console.log(map2.get(keyFunc));     // func value
    console.log(map2.get(NaN));         // NaN value
```

### Linked list <a name="llist"></a> 
![Linked list](pics/llist.gif)
![Linked list2](pics/llist2.jpg)
```javascript
    const util = require('util')

    function LinkedList() {
        let length = 0;
        let head = null;
        let Node = function(element) { // define a node in the linked list
            this.element = element;
            this.next = null;
        }
        this.size = function() { return length } // get linked list length
        this.head = function() { return head } // return head of the linked list
        this.add = function(element) { // add element to linked list
            let node = new Node(element);
            if(head === null) { head = node } else {
                let currentNode = head;
                while(currentNode.next) {
                    currentNode = currentNode.next;
                }
                currentNode.next = node;
            }
            length++;
        }
        this.remove = function(element) { // remove an element from the linked list by its data
            let currentNode = head;
            let previousNode;
            if(currentNode.element === element) {
                head = currentNode.next;
            } else {
                while(currentNode.element !== element) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
                previousNode.next = currentNode.next;
            }
            length--;
        }
        this.isEmpty = function() { return length == 0 } // check if linked list is empty
        this.indexOf = function(element) { // get index of an element
            let currentNode = head;
            let index = 0; // function return -1 if element is not in the linked list
            if(currentNode.element === element) {
                return index;
            } else {
                while(currentNode.element !== element) {
                    currentNode = currentNode.next;
                    index++;
                }
                if(currentNode !== null) { return index } else { return -1 }
            }
        }
        this.elementAt = function(index) { // get element by index
            let currentNode = head;
            let currentIndex = 0;
            while(currentNode && index !== currentIndex) {
                currentNode = currentNode.next;
                currentIndex++;
            }
            if(currentNode) { return currentNode.element } else {
                return -1;
            }
        }
        this.addAt = function(index, element) { // add element at given index
            let node = new Node(element);
            let currentNode = head;
            let currentIndex = 0;
            let previousNode;
            if(index > length - 1) { return 'index out of range!' } else {
                if(index === 0) {
                    node.next = head;
                    head = node; 
                    length++;
                    return  
                }
                while(index !== currentIndex) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                    currentIndex++
                }
                previousNode.next = node;
                node.next = currentNode;
                length++;
            }
        }
        this.removeAt = function(index) { // remove element at index
            let currentNode = head;
            let currentIndex = 0;
            let previousNode;
            if(index > length - 1) { return 'index out of range!' } else {
                if(index === 0) {
                    head = head.next;
                    length--;
                    return  
                }
                while(index !== currentIndex) {
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                    currentIndex++
                }
                previousNode.next = currentNode.next;
                length--;
            }
        }

    }

    let myll = new LinkedList();
    console.log(myll.size());           // 0
    console.log(myll.head());           // null
    myll.add(12);
    console.log(myll.size());           // 1
    myll.add(34);
    console.log(myll.size());           // 2
    console.log(myll.head());           // Node {element:12,next:Node{ element: 34, next: null } }
    myll.add(76);
    myll.add(43);
    console.log(myll.size());           // 4
    myll.remove(76);                    
    console.log(myll.size());           // 3
    console.log(myll.indexOf(34));      // 1
    console.log(myll.elementAt(4));     // -1
    console.log(myll.head());           // Node {element:12,next:Node{element:34,next Node{element:43,next:null}}}
    console.log(myll.addAt(7, 'lalala'));   // index out of range!
    console.log(myll.addAt(0, 'lalala'));   // undefined
    console.log(myll.addAt(2, 'lolo'));     // undefined
    console.log(util.inspect(myll.head(), {showHidden: false, depth: null})); // Node {element: 'lalala',next: Node {element: 12,next:Node {element: 'lolo',next: Node { element: 34, next: Node { element: 43, next: null } } } } }
    console.log(myll.removeAt(2));      // undefined
    console.log(util.inspect(myll.head(), {showHidden: false, depth: null})); // Node {element: 'lalala',next: Node {element: 12,next: Node { element: 34, next: Node { element: 43, next: null } } } }
```


### Trie <a name="trie"></a> 
![Trie](pics/trie.png)
* An use case is to validate if a word in the dictionary
```javascript
    const Node = function() {
        this.keys = new Map();
        this.end = false;
        this.setEnd = function() { this.end = true };
        this.isEnd = function() { return this.end };
    }

    let Trie = function() {
        this.root = new Node();
        this.add = function(input, node = this.root) { // add word to trie
            if (input.length == 0) {
                node.setEnd();
                return;
            } else if (!node.keys.has(input[0])) {
                node.keys.set(input[0], new Node());
                return this.add(input.substr(1), node.keys.get(input[0]));
            } else {
                return this.add(input.substr(1), node.keys.get(input[0]));
            };
        };
        this.isWord = function(word) { // check if word is in trie
            let node = this.root;
            while (word.length > 1) {
                if (!node.keys.has(word[0])) {
                    return false;
                } else {
                    node = node.keys.get(word[0]);
                    word = word.substr(1);
                };
            };
            return (node.keys.has(word) && node.keys.get(word).isEnd()) ? 
                true : false;
        };

        this.print = function() {
            let words = new Array();
            let search = function(node, string) {
                if (node.keys.size != 0) {
                    for (let letter of node.keys.keys()) {
                        search(node.keys.get(letter), string.concat(letter));
                    };
                    if (node.isEnd()) {
                        words.push(string);
                    };
                } else {
                    string.length > 0 ? words.push(string) : undefined;
                    return;
                };
            };
            search(this.root, new String());
            return words.length > 0 ? words : mo;
        };

    };

    myTrie = new Trie()
    myTrie.add('ball'); 
    myTrie.add('bat'); 
    myTrie.add('doll'); 
    myTrie.add('dork'); 
    myTrie.add('do'); 
    myTrie.add('dorm')
    myTrie.add('send')
    myTrie.add('sense')
    console.log(myTrie.isWord('doll'));     // true
    console.log(myTrie.isWord('dor'))       // false
    console.log(myTrie.isWord('dorf'))      // false
    console.log(myTrie.print());            // [ 'ball', 'bat', 'doll', 'dork', 'dorm', 'do', 'send', 'sense' ]
```

### Heap <a name="heap"></a> 
![Heap](pics/heap.jpg)
* Partially ordered binary tree which satisfies the heap property.
* Heap property indicates a specific relationship between parent and child node
* Max heap: all parent nodes are greater than or equal to child nodes
* Min heap: all child nodes are greater than or equal to parent nodes
* The order between child nodes in a same level does not matter
* Binary heaps are complete binary trees: all levels of the tree are fully filled (if the last level partially filled, it's filled from left to right)
* In array representation, index start at `1` so index `0` is `null`
* Node at index `k` has left child node at index `2*k` and right child node at index `2*k+1`
* Node at index `l` has parent node at index `roundDown(l/2)`
* [Online heap and array representation](https://www.cs.usfca.edu/~galles/visualization/Heap.html)
* [Online interacting heap creation](https://visualgo.net/en/heap)
* Heap valuable feature: min and max sorting. With the worst case performance of `O(nlogn)`
![Heap2](pics/heap2.png)

```javascript
    const myMinHeap = new MinHeap();
    myMinHeap.insert(8);
    myMinHeap.insert(32);
    myMinHeap.insert(31);
    myMinHeap.insert(5);
    myMinHeap.print();              // [ null, 5, 8, 31, 32 ]
    myMinHeap.insert(7);
    myMinHeap.insert(100);
    myMinHeap.print();              // [ null, 5, 7, 31, 32, 8, 100 ]
    console.log(myMinHeap.sort());  // [ 5, 7, 8, 31, 32, 100 ]
    myMinHeap.print();              // [ null ]

    const myMaxHeap = new MaxHeap();
    myMaxHeap.insert(8);
    myMaxHeap.insert(32);
    myMaxHeap.insert(31);
    myMaxHeap.insert(5);
    myMaxHeap.print();              // [ null, 32, 8, 31, 5 ]
    myMaxHeap.insert(7);
    myMaxHeap.insert(100);
    myMaxHeap.print();              // [ null, 100, 8, 32, 5, 7, 31 ]
    console.log(myMaxHeap.sort());  // [ 100, 32, 31, 8, 7, 5 ]
    myMaxHeap.print();              // [ null ]


    function MinHeap() {
        let heap = [null];
        this.print = function() { console.log(heap) } // print the heap array representation
        this.insert = function(num) { // insert a number to heap
            heap.push(num);
            if (heap.length > 2) {
                let idx = heap.length - 1;
                while (heap[idx] < heap[Math.floor(idx/2)]) {
                    if (idx >= 1) {
                        [heap[Math.floor(idx/2)], heap[idx]] = [heap[idx], heap[Math.floor(idx/2)]];
                        if (Math.floor(idx/2) > 1) {
                            idx = Math.floor(idx/2);
                        } else {
                            break;
                        };
                    };
                };
            };
        };
        this.remove = function() { // remove a number from heap
            let smallest = heap[1];
            if (heap.length > 2) {
                heap[1] = heap[heap.length - 1];
                heap.splice(heap.length - 1);
                if (heap.length == 3) {
                    if (heap[1] > heap[2]) {
                        [heap[1], heap[2]] = [heap[2], heap[1]];
                    };
                    return smallest;
                };
                let i = 1;
                let left = 2 * i;
                let right = 2 * i + 1;
                while (heap[i] >= heap[left] || heap[i] >= heap[right]) {
                    if (heap[left] < heap[right]) {
                        [heap[i], heap[left]] = [heap[left], heap[i]];
                        i = 2 * i
                    } else {
                        [heap[i], heap[right]] = [heap[right], heap[i]];
                        i = 2 * i + 1;
                    };
                    left = 2 * i;
                    right = 2 * i + 1;
                    if (heap[left] == undefined || heap[right] == undefined) {
                        break;
                    };
                };
            } else if (heap.length == 2) {
                heap.splice(1, 1);
            } else {
                return null;
            };
            return smallest;
        };
        this.sort = function() {
            let result = new Array();
            while (heap.length > 1) {
                result.push(this.remove());
            };
            return result;
        };

    };

    function MaxHeap() {
        let heap = [null];
        this.print = () => { console.log(heap) };
        this.insert = function(num) {
            heap.push(num);
            if (heap.length > 2) {
                let idx = heap.length - 1;
                while (heap[idx] > heap[Math.floor(idx/2)]) {
                    if (idx >= 1) {
                        [heap[Math.floor(idx/2)], heap[idx]] = [heap[idx], heap[Math.floor(idx/2)]];
                        if (Math.floor(idx/2) > 1) {
                            idx = Math.floor(idx/2);
                        } else {
                            break;
                        };
                    };
                };
            };
        };
        this.remove = function() {
            let smallest = heap[1];
            if (heap.length > 2) {
                heap[1] = heap[heap.length - 1];
                heap.splice(heap.length - 1);
                if (heap.length == 3) {
                    if (heap[1] < heap[2]) {
                        [heap[1], heap[2]] = [heap[2], heap[1]];
                    };
                    return smallest;
                };
                let i = 1;
                let left = 2 * i;
                let right = 2 * i + 1;
                while (heap[i] <= heap[left] || heap[i] <= heap[right]) {
                    if (heap[left] > heap[right]) {
                        [heap[i], heap[left]] = [heap[left], heap[i]];
                        i = 2 * i
                    } else {
                        [heap[i], heap[right]] = [heap[right], heap[i]];
                        i = 2 * i + 1;
                    };
                    left = 2 * i;
                    right = 2 * i + 1;
                    if (heap[left] == undefined || heap[right] == undefined) {
                        break;
                    };
                };
            } else if (heap.length == 2) {
                heap.splice(1, 1);
            } else {
                return null;
            };
            return smallest;
        };
        this.sort = function() {
            let result = new Array();
            while (heap.length > 1) {
                result.push(this.remove());
            };
            return result;
        };
    };
```

### Graph <a name="graph"></a> 
![Graph](pics/graph.png)
* Graph is collection of things and relationship between them
* Data in graph is called node(vertices) and connection between nodes called edges
* There are two major types of graphs: `directed` and `undirected`
* `directed` graph is graph with direction (e.g. social network)
* `undirected` graph is graph with direction (e.g. webpage links)
![Graph2](pics/graph2.gif)
* Representation of graph: `adjacency list`, `adjacency matrix` can represent direction, `incidence matrix` (row are nodes, column are edges)
```javascript
const adjacencyList = [
    [ 1, 2 ],   // node 1
    [ 0 ],      // node 2
    [ 2 ],      // node 3
];

const adjacencyMatrix = [
    [ 0, 1, 1 ],   // node 1
    [ 0, 0, 0 ],   // node 2
    [ 1, 0, 0 ],   // node 3
]

const incidenceMatrix = [
    [ 0, 1, -1 ],   
    [ 0, 0, 0 ],
    [ -1, 0, 0 ],
]
```
![Graph3](pics/graph3.gif)
![Graph4](pics/graph4.jpg)
* Graph traversal: `breadth-first search`, `depth-first search`
![breadth-first search](pics/graph5.png)
```javascript
    var exBFSGraph = [ // adjagency representation of a graph
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0]
    ];
    console.log(bfs(exBFSGraph, 1)); // distance between node 1 to other nodes
    // { '0': 2, '1': 0, '2': 1, '3': 3, '4': Infinity }


    function bfs(graph, root) {
        var nodesLen = {};
        for (var i = 0; i < graph.length; i++) {
            nodesLen[i] = Infinity;
        }
        nodesLen[root] = 0; 
        var queue = [root]; 
        var current; 
        while (queue.length != 0) {
            current = queue.shift();

            var curConnected = graph[current];
            var neighborIdx = []; 
            var idx = curConnected.indexOf(1); 
            while (idx != -1) {
                neighborIdx.push(idx); 
                idx = curConnected.indexOf(1, idx + 1); 
            }
            for (var j = 0; j < neighborIdx.length; j++) {
                if (nodesLen[neighborIdx[j]] == Infinity) {
                    nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
                    queue.push(neighborIdx[j]); 
                }
            }
        }
        return nodesLen;
    };
```

### Big O notation <a name="bigo"></a>
* Simplify analysis of algoritm's efficiency
* Complexity in term of input size, N
* Machine independent, basic computer step
* Analyze time and space of worst case scenario
* Ignore constant `5n -> O(n)`
* Cetain terms dominate others `O(1) < O(logn) < O(n) < O(nlogn) < O(n^2) < O(2^n) < O(n!)`
![Big O](pics/bigo.png)
```javascript
    x = 5 + 15 * 20;        // O(1) independent of input size (input are constants)

    x = 5 + 15 * 20;
    y = 9 - 6;
    console.log(x + y)      // total time = O(1) + O(1) + O(1) = 3O(1) = O(1) (constants are dropped)

    for(let i = 0; i < N; i++) {
        console.log(i)
    }                       // total time = N * O(1) = O(N) (input now is N, not constant)

    y = 32 + 6
    for(let i = 0; i < N; i++) {
        console.log(i)
    }                       // total time = O(1) + N * O(1) = O(N) (low order term is dropped)


    y = 32 + 6
    for(let i = 0; i < N; i++) {
        console.log(i)
    }   
    for(let i = 0; i < N; i++) {
        for(let j = 0; i < N; i++) {
            console.log(j);
        }   
    }                       // total time = max(O(1), O(N), O(N^2)) = O(N^2) (O(N^2) dominates)

    if(x > 0) { 
        // O(1)
    } else if(x < 0) {
        // O(logn)
    } else {
        // O(n^2)
    }                       // total time = O(n^2) (big O considers worst case scenario)
```
