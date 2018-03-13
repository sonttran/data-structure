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