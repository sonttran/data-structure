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
console.log(myBt.findMinHeight());
myBt.add(8);
myBt.add(0.5);
myBt.add(2);
myBt.add(1.6);
myBt.add(2.2);
myBt.add(1.4);
myBt.add(1.7);
//console.log(util.inspect(myBt, {showHidden: false, depth: null}));
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
console.log(myBt.findMin());    // 0.5
console.log(myBt.findMax());    // 8
console.log(myBt.exist(5));     // false
console.log(myBt.exist(2.2));   // true
//console.log(myBt.remove(1));
//console.log(util.inspect(myBt, {showHidden: false, depth: null}));
//console.log(myBt.add(100));
//console.log(myBt.add(9));
//console.log(myBt.add(7));
//console.log(myBt.add(6));
//console.log(myBt.remove(10)); 
console.log(myBt.findMinHeight());  
console.log(myBt.findMaxHeight());  
console.log(myBt.inOrder());  
console.log(myBt.bottomUp());  
console.log(myBt.isBalanced());  
console.log(myBt.topDown());  
console.log(myBt.preOrder());  
console.log(myBt.postOrder());  
console.log(myBt.levelOrder());  
//console.log(util.inspect(myBt, {showHidden: false, depth: null}));
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



class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            const searchTree = function(node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }
    findMin() {
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
    findMax() {
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }
    find(data) {
        let current = this.root;
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current === null) {
                return null;
            }
        }
        return current;
    }
    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
    remove(data) {
        const removeNode = function(node, data) {
            if (node == null) {
                return null;
            }
            if (data == node.data) {
                // node has no children 
                if (node.left == null && node.right == null) {
                    return null;
                }
                // node has no left child 
                if (node.left == null) {
                    return node.right;
                }
                // node has no right child 
                if (node.right == null) {
                    return node.left;
                }
                // node has two children 
                var tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        this.root = removeNode(this.root, data);
    }
    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }
    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }
    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }
    inOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();
            function traverseInOrder(node) {       
                node.left && traverseInOrder(node.left);
                result.push(node.data);
                node.right && traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            return result;
        };
    }
    preOrder() {
        if (this.root == null) {
            return null;
        } else {
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
        if (this.root == null) {
            return null;
        } else {
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

const bt = new BST();

bt.add(4);
bt.add(1);
bt.add(8);
bt.add(0.5);
bt.add(2);
bt.add(1.6);
bt.add(2.2);
bt.add(1.4);
bt.add(1.7);
console.log(bt.findMinHeight());
console.log(bt.findMaxHeight());
//console.log(util.inspect(bt, {showHidden: false, depth: null}));
//bt.remove(1);
//console.log(util.inspect(bt, {showHidden: false, depth: null}));





