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
}

class Node {
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }
}

let myHashMap = new HashMap();

console.log(myHashMap.buckets);
console.log(myHashMap.capacity);
console.log(myHashMap.loadFactor);

console.log(myHashMap.hash('Mark'));
console.log(myHashMap.hash('Bob'));
console.log(myHashMap.hash('Steven'));
