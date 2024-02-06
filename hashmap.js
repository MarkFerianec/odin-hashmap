class HashMap {
  bucketsSize = 16;
  buckets = Array(this.bucketsSize);
  capacity = 0;
  loadFactor = 0.75;

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    // return hashCode;
    return hashCode % 16;
    // This does not work because it hashes differently:
    // return hashCode % this.bucketsSize;
  }

  set(key, value) {
    if (this.buckets[this.hash(key)] === undefined) {
      let newNode = new Node(key, value);
      this.buckets[this.hash(key)] = newNode;
      this.capacity += 1;
      // We might have to move this to a better spot
      // Maybe before this.capacity += 1; or after?
      if (this.capacity / this.bucketsSize === this.loadFactor) {
        console.log('load factor reached');
        let newArray = Array(2 * this.bucketsSize);
        this.bucketsSize *= 2;
        for (let i = 0; i < this.buckets.length; i++) {
          newArray[i] = this.buckets[i];
        }
        this.buckets = newArray;
      }
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

  get(key) {
    let temporary = this.buckets[this.hash(key)];

    if (temporary === undefined) {
      return null;
    }

    if (temporary.key === key) {
      return temporary.value;
    }

    while (temporary.nextNode !== null) {
      if (temporary.key === key) {
        return temporary.value;
      }
      temporary = temporary.nextNode;
    }

    if (temporary.key === key) {
      return temporary.value;
    }

    return null;
  }

  has(key) {
    let temporary = this.buckets[this.hash(key)];

    if (temporary === undefined) {
      return false;
    }

    if (temporary.key === key) {
      return true;
    }

    while (temporary.nextNode !== null) {
      if (temporary.key === key) {
        return true;
      }
      temporary = temporary.nextNode;
    }

    if (temporary.key === key) {
      return true;
    }

    return false;
  }

  remove(key) {
    let temporary = this.buckets[this.hash(key)];

    if (temporary === undefined || temporary === null) {
      return false;
    }

    if (temporary.key === key) {
      this.buckets[this.hash(key)] = temporary.nextNode;
      return true;
    }

    while (temporary.nextNode !== null) {
      if (temporary.nextNode.key === key) {
        temporary.nextNode = temporary.nextNode.nextNode;
        return true;
      }
      temporary = temporary.nextNode;
    }

    // I thought this would be necessary but maybe it isn't:
    // if (temporary.nextNode !== null) {
    //   if (temporary.nextNode.key === key) {
    //     temporary.nextNode = null;
    //     return true;
    //   }
    // }

    return false;
  }

  length() {
    let sum = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let temporary = this.buckets[i];

        while (temporary !== null) {
          sum += 1;
          temporary = temporary.nextNode;
        }
      }
    }

    return sum;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = undefined;
    }
  }

  keys() {
    let arrayOfKeys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let temporary = this.buckets[i];

        while (temporary !== null) {
          arrayOfKeys.push(temporary.key);
          temporary = temporary.nextNode;
        }
      }
    }

    return arrayOfKeys;
  }

  values() {
    let arrayOfValues = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let temporary = this.buckets[i];

        while (temporary !== null) {
          arrayOfValues.push(temporary.value);
          temporary = temporary.nextNode;
        }
      }
    }

    return arrayOfValues;
  }

  entries() {
    let arrayOfEntries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let temporary = this.buckets[i];

        while (temporary !== null) {
          let temporaryArray = [];
          temporaryArray.push(temporary.key);
          temporaryArray.push(temporary.value);
          arrayOfEntries.push(temporaryArray);
          temporary = temporary.nextNode;
        }
      }
    }

    return arrayOfEntries;
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

myHashMap.set('Mark', 'Something');
myHashMap.set('Bob', 'Something');
myHashMap.set('Steven', '1');
// myHashMap.set('Steven', 'overwritten');
myHashMap.set('James', 'Something');
myHashMap.set('Patricia', 'Something');
myHashMap.set('Jennifer', 'Something');
myHashMap.set('John', '2');
// myHashMap.set('John', 'overwrite John');
myHashMap.set('Elizabeth', 'Something');
myHashMap.set('William', 'Something');
myHashMap.set('Richard', 'Something');
myHashMap.set('Sarah', '3');
// myHashMap.set('Sarah', 'overwrite Sarah');
// myHashMap.set('Sarah', 'overwrite Sarah AGAIN');
// myHashMap.set('Steven', 'Overwrite Steven later on');
// myHashMap.set('Sarah', 'Overwrite Sarah sometime later');
// myHashMap.set('John', 'Im done with this maybe');

myHashMap.set('David', 'Something');
myHashMap.set('Barbara', 'Something');
myHashMap.set('Susan', 'Something');
myHashMap.set('Christopher', 'Something');
// myHashMap.set('Lisa', 'Something');
myHashMap.set('Anthony', 'Something');
myHashMap.set('Margaret', 'Something');

// This next node is used to reach load factor
myHashMap.set('Ashley', 'Something');

console.log(myHashMap.buckets);

// console.log(myHashMap.get('Mark')); // Should return 'Something'
// console.log(myHashMap.get('Paul')); // Should return null

// console.log(myHashMap.get('Steven')); // Should return 1
// console.log(myHashMap.get('John')); // Should return 2
// console.log(myHashMap.get('Sarah')); // Should return 3
// console.log(myHashMap.get('Lisa')); // Should return null
// console.log(myHashMap.get('g43')); // Should return null

// console.log(myHashMap.has('Mark')); // Should return true
// console.log(myHashMap.has('Paul')); // Should return false
// console.log(myHashMap.has('Steven')); // Should return true
// console.log(myHashMap.has('Sarah')); // Should return true
// console.log(myHashMap.has('g43')); // Should return false

myHashMap.set('23213141', '4'); // Added for testing purposes
myHashMap.set('b431d3j', '5'); // Added for testing purposes

// console.log(myHashMap.remove('Steven')); // Should return true
// console.log(myHashMap.remove('John')); // Should return true
// console.log(myHashMap.remove('Sarah')); // Should return true
// console.log(myHashMap.remove('23213141')); // Should return true
// console.log(myHashMap.remove('b431d3j')); // Should return true

// console.log(myHashMap.remove('Paul')); // Should return false
// console.log(myHashMap.remove('g43')); // Should return false

// console.log(myHashMap.length());

// myHashMap.clear();

// console.log(myHashMap.buckets);

// console.log(myHashMap.keys());

// console.log(myHashMap.values());

console.log(myHashMap.entries());
