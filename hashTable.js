var hash = (string, max) => { // return hash number 
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i);
    }
    return hash % max;
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