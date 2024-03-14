import createNode from './nodefactory.js';

export default function createList() {
  let head = createNode();
  let size = 0;

  const findNull = node => {
    if (node.next === null) {
      return node;
    }
    return findNull(node.next);
  };

  const findSecondLastNull = node => {
    if (node.next.next === null) return node;
    return findSecondLastNull(node.next);
  };

  const getHead = () => head;

  const tail = () => findNull(getHead());

  const increaseSize = () => {
    size += 1;
  };

  const decreaseSize = () => {
    size -= 1;
  };

  const getNode = (node, howDeep) => {
    if (howDeep === 0) return node;
    if (node.next === null && howDeep >= 1) return false;
    const depth = howDeep - 1;
    return getNode(node.next, depth);
  };

  const at = index => {
    if (index >= 0) {
      const node = getNode(getHead(), index);
      if (node === false) return 'index too great';
      return node;
    }
    return 'index too small';
  };

  const pop = () => {
    if (getHead().next === null) {
      getHead().key = null;
      decreaseSize();
    } else {
      const newLastNode = findSecondLastNull(getHead());
      newLastNode.next = null;
      decreaseSize();
    }
  };

  const getSize = () => size;

  const removeAt = index => {
    if (index === 0) {
      if (getSize() > 1) {
        head = head.next;
        decreaseSize();
        return true;
      }
      pop();
      decreaseSize();
      return true;
    }
    if (index > 0) {
      if (at(index).next !== null) {
        at(index - 1).next = at(index).next;
        decreaseSize();
        return true;
      }
      at(index - 1).next = null;
      decreaseSize();
      return true;
    }
  };

  const checkKey = (key, node, ...indx) => {
    if (indx.length > 0) {
      const i = indx[0];
      if (node.key === key) return i;
      if (node.next === null) return false;
      return checkKey(key, node.next, i + 1);
    }
    if (node.key === key) return node;
    if (node.next === null) return false;
    return checkKey(key, node.next);
  };

  const getNodeWithKey = key => {
    const node = checkKey(key, getHead());
    if (node !== false) return node;
    return false;
  };

  const contains = key => {
    if (getNodeWithKey(key) !== false) return true;
    return false;
  };

  const find = key => {
    const indx = checkKey(key, getHead(), 0);
    return indx;
  };

  const returnEveryValue = (node, string) => {
    if (node.next === null) {
      const newStr = `${string}( ${node.key} ) -> null`;
      return newStr;
    }
    const newStr = `${string}( ${node.key} ) -> `;
    return returnEveryValue(node.next, newStr);
  };

  const stringify = () => returnEveryValue(getHead(), '');

  const append = key => {
    if (getHead().key === null) {
      getHead().key = key;
      increaseSize();
    } else {
      const lastNode = findNull(getHead());
      lastNode.next = createNode(key);
      increaseSize();
    }
  };

  const prepend = key => {
    const newNode = createNode(key, getHead());
    head = newNode;
    increaseSize();
  };

  return {
    append,
    prepend,
    getSize,
    at,
    removeAt,
    pop,
    contains,
    find,
    stringify,
    getNodeWithKey,
  };
}
