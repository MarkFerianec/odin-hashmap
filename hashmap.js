class HashMap {
  BucketsSize = 16;
  buckets = Array(this.BucketsSize);
  capacity = this.buckets.length;
  loadFactor = 0.75;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    // return hashCode;
    return hashCode % this.capacity;
  }

  set(key, value) {
    if (this.buckets[this.hash(key)] === undefined) {
      let newNode = new Node(key, value);
      this.buckets[this.hash(key)] = newNode;
    }

    if (this.buckets[this.hash(key)] !== undefined) {
      // The beginning of linked list
      let temporary = this.buckets[this.hash(key)];

      let keyExists = false;

      // if first node's key is same as key
      if (temporary.key === key) {
        temporary.value = value;
        keyExists = true;
      }

      // I think this works for all nodes inbetween first and last?
      while (temporary.nextNode !== null) {
        if (temporary.key === key) {
          temporary.value = value;
          keyExists = true;
          break;
        }
        temporary = temporary.nextNode;
      }

      // if last node's key is same as key
      // Maybe I don't need to put temporary.nextNode === null in if statement?
      // if (temporary.nextNode === null && temporary.key === key) {
      if (temporary.key === key) {
        temporary.value = value;
        keyExists = true;
      }

      if (keyExists !== true) {
        let newNode = new Node(key, value);
        temporary.nextNode = newNode;
      }
    }
  }
}

class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

let myHashMap = new HashMap();

// console.log(myHashMap.buckets);
// console.log(myHashMap.capacity);
// console.log(myHashMap.loadFactor);

// console.log(myHashMap.hash('Mark'));
// console.log(myHashMap.hash('Bob'));
// console.log(myHashMap.hash('Steven')); // Hashes to 11
// console.log(myHashMap.hash('James'));
// console.log(myHashMap.hash('Patricia'));
// console.log(myHashMap.hash('Jennifer'));
// console.log(myHashMap.hash('John')); // Hashes to 11
// console.log(myHashMap.hash('Elizabeth'));
// console.log(myHashMap.hash('William'));
// console.log(myHashMap.hash('Richard'));
// console.log(myHashMap.hash('Sarah')); // Hashes to 11

// myHashMap.set('Mark', 'Something');
// myHashMap.set('Bob', 'Something');
myHashMap.set('Steven', '1');
myHashMap.set('Steven', 'overwritten');
// myHashMap.set('James', 'Something');
// myHashMap.set('Patricia', 'Something');
// myHashMap.set('Jennifer', 'Something');
myHashMap.set('John', '2');
myHashMap.set('John', 'overwrite John');
// myHashMap.set('Elizabeth', 'Something');
// myHashMap.set('William', 'Something');
// myHashMap.set('Richard', 'Something');
myHashMap.set('Sarah', '3');
myHashMap.set('Sarah', 'overwrite Sarah');
myHashMap.set('Sarah', 'overwrite Sarah AGAIN');
myHashMap.set('Steven', 'Overwrite Steven later on');
myHashMap.set('Sarah', 'Overwrite Sarah sometime later');
myHashMap.set('John', 'Im done with this maybe');

console.log(myHashMap.buckets);
