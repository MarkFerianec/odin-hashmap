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
    // if the buckets have reached loadfactor of 0.75
    // increase buckets size * 2, copy over all nodes.
    // not just that, we need to make a linked list with
    // new nodes added to shared buckets

    if (this.buckets[this.hash(key)] === undefined) {
      let newNode = new Node(key, value);
      this.buckets[this.hash(key)] = newNode;
    } else {
      let newNode = new Node(key, value);
      let temporary = this.buckets[this.hash(key)];
      while (temporary.nextNode != null) {
        temporary = temporary.nextNode;
      }
      temporary.nextNode = newNode;
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
console.log(myHashMap.hash('Steven'));
// console.log(myHashMap.hash('James'));
// console.log(myHashMap.hash('Patricia'));
// console.log(myHashMap.hash('Jennifer'));
console.log(myHashMap.hash('John'));
// console.log(myHashMap.hash('Elizabeth'));
// console.log(myHashMap.hash('William'));
// console.log(myHashMap.hash('Richard'));
console.log(myHashMap.hash('Sarah'));

// myHashMap.set('Mark', 'Something');
// myHashMap.set('Bob', 'Something');
myHashMap.set('Steven', '1');
// myHashMap.set('James', 'Something');
// myHashMap.set('Patricia', 'Something');
// myHashMap.set('Jennifer', 'Something');
myHashMap.set('John', '2');
// myHashMap.set('Elizabeth', 'Something');
// myHashMap.set('William', 'Something');
// myHashMap.set('Richard', 'Something');
myHashMap.set('Sarah', '3');

console.log(myHashMap.buckets);

// myHashMap.set('Mark', 'Something else');

// console.log(myHashMap.buckets);
