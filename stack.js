const Stack = function() { // first in, last out (FILO)
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
    this.peek = function() {  // same with top, return the value on top of the stack
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
console.log(myStack.peek());        // b
console.log(myStack.bottom());      // a
console.log(myStack.length());      // 2

