import createList from './linkedlist.js';

export default class HashSet {
  constructor() {
    this.buckets = [];
    this.mod = 16;
    this.capacity = 0;
    this.loadFactor = 0.75;
    this.initBucket(this.mod);
  }

  hash(key) {
    this.hashCode = 0;
    const primeN = 31;
    if (key.length === undefined) {
      this.hashCode = key % this.mod;
    } else {
      for (let i = 0; i < key.length; i += 1) {
        console.log(key.charCodeAt(i));
        this.hashCode = (primeN * this.hashCode + key.charCodeAt(i)) % this.mod;
      }
    }
    console.log(`hashcode ${this.hashCode}`);
    return this.hashCode;
  }

  initBucket(size) {
    for (let i = 0; i < size; i += 1) {
      const newList = createList();
      this.buckets[i] = newList;
    }
  }

  checkBucketsLength(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
  }

  keys() {
    const total = [];
    for (let i = 0; i < this.mod; i += 1) {
      const size = this.buckets[i].getSize();
      if (size > 0) {
        for (let x = 0; x < size; x += 1) {
          const node = this.buckets[i].at(x);
          total.push(node.key);
        }
      }
    }
    return total;
  }

  clear() {
    this.initBucket(this.mod);
  }

  length() {
    let total = 0;
    for (let i = 0; i < this.mod; i += 1) {
      total += this.buckets[i].getSize();
    }
    return total;
  }

  increaseLoad() {
    // const ogArray = this.buckets;
    console.log('increasing');
    const keys = this.keys();
    this.buckets = [];
    this.mod *= 2;
    this.capacity = 0;
    this.initBucket(this.mod);
    keys.forEach(key => {
      this.set(key);
    });
  }

  calcLoad() {
    const currLoad = this.capacity / this.buckets.length;
    console.log(`Current load: ${currLoad}`);
    if (currLoad >= this.loadFactor) this.increaseLoad();
  }

  increaseCapacity() {
    this.capacity += 1;
    this.calcLoad();
  }

  decreaseCapacity() {
    this.capacity -= 1;
    this.calcLoad();
  }

  remove(key) {
    const hashkey = this.hash(key);
    const indx = this.buckets[hashkey].find(key);
    if (indx !== false) {
      this.decreaseCapacity();
      return this.buckets[hashkey].removeAt(indx);
    }
    return false;
  }

  has(key) {
    const hashkey = this.hash(key);
    return this.buckets[hashkey].contains(key);
  }

  get(key) {
    const hashkey = this.hash(key);
    const node = this.buckets[hashkey].getNodeWithKey(key);
    if (node !== false) return node.key;
    return null;
  }

  set(key) {
    const hashkey = this.hash(key);
    if (this.buckets[hashkey].getSize() === 0) {
      this.checkBucketsLength(hashkey);
      this.buckets[hashkey].append(key);
      this.increaseCapacity();
      return;
    }
    if (this.buckets[hashkey].contains(key) === false)
      this.buckets[hashkey].append(key);
  }
}
