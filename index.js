const log = console.log;

class Hashy {
    constructor(size) {
        this.size = size;
        this.storage = new Array(size).fill('<<EMPTY>>');
    }

    hashFunction(key) {
        // returns the index in the array
        if (key.length == 0) { log('The key needs to be a string !!'); return null; }
        let hash = 0;
        hash = Array.prototype.reduce.call(key, (acc, val) => (val.charCodeAt(0) + acc), hash);
        return hash % this.size;
    }

    get(key) {
        const index = this.hashFunction(key);
        return typeof (this.storage[index]) == 'object' ? this.storage[index].find(item => (item[0] == key)) || null : null;
    }

    set(key, value) {
        const index = this.hashFunction(key);
        log('storing at ', index);
        if (this.storage[index] === '<<EMPTY>>') {
            this.storage[index] = [[key, value]];
        } else {
            log(`For storing key: ${key} , value: ${value}... There was a collision at ${index}. The hashmap has already a value there : ${this.storage[index]}`);
            let foundIndex;
            foundIndex = this.storage[index].find(item => (item[0] == key));
            if (!foundIndex) { this.storage[index].push([key, value]); } else {
                this.storage[index].splice(foundIndex, 1, [key, value]);
            }
        }

    }
    printHashTable() {
        log(this.storage);
    }
    
    printAllKeys(){
        this.storage.forEach(item =>{
            if(typeof(item) == 'object')// it has an array which will contain atleast one key value pair
            {
                item.forEach(keyVal => log(keyVal[0]));
            }
        });
    }
}

const h1 = new Hashy(10);
h1.set("ashish", "mishra");
h1.set("rashmi", "desai");
h1.set("paras", "chhabra");
h1.set("big", "boss");
h1.set("vishal", "singh");
h1.set("donald", "trump");
h1.set("train", "ur dragon");

h1.set("kala", "dupatta");

h1.printHashTable();

log('---');
log(h1.get("big"));
log(h1.get("rashmi"));
log(h1.get("bhawna"));
log(h1.get("donald"));
log(h1.get("manoj"));
// We can also include some collision handling mechaism -like separate chaining !
log('---');
h1.printAllKeys();