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

