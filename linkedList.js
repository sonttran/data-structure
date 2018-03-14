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
    this.removeAt = function(index) {
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

