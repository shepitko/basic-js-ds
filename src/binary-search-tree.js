const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  binaryTree = null;

  root() {
    return this.binaryTree;
  }

  add(value) {
    if (this.binaryTree === null) this.binaryTree = {
      data: null,
      up: null,
      left: null,
      right: null
    }
    let n = this.binaryTree;
    while (true) {
      if (n.data === null) {
        n.data = value;
        break;
      }
      else if (value < n.data) {
        if (n.left === null) {
          n.left = {
            data: value,
            up: n,
            left: null,
            right: null
          }
          break;
        }
        else {
          n = n.left;
          continue;
        }
      }
      else if (value > n.data) {
        if (n.right === null) {
          n.right = {
            data: value,
            up: n,
            left: null,
            right: null
          }
          break;
        }
        else {
          n = n.right;
          continue;
        }
      }
      else break;
    }
  }

  has(value) {
    if (this.binaryTree === null) return false;
    let n = this.binaryTree;
    while (true) {
      if (value === n.data) return true;
      else if (value < n.data) {
        if (n.left === null) return false;
        else {
          n = n.left;
          continue;
        }
      }
      else if (value > n.data) {
        if (n.right === null) return false;
        else {
          n = n.right;
          continue;
        }
      }
    }
  }

  find(value) {
    if (this.binaryTree === null) return null;
    let n = this.binaryTree;
    while (true) {
      if (value === n.data) return n;
      else if (value < n.data) {
        if (n.left === null) return null;
        else {
          n = n.left;
          continue;
        }
      }
      else if (value > n.data) {
        if (n.right === null) return null;
        else {
          n = n.right;
          continue;
        }
      }
    }
  }

  remove(value) {
    function findMinNode(start) {
      let n = start;
      while (true) {
        if (n.left !== null) {
          n = n.left;
          continue;
        }
        else return n;
      }
    }

    let n = this.find(value);
    if (n === null) return;
    let up = n.up;
    if (n.left === null && n.right === null) {
      if (up !== null) {
        if (n.data < up.data) up.left = null;
        else up.right = null;
      }
      else {
        this.binaryTree = null;
      }
    }
    else if (n.left === null && n.right !== null) {
      if (up !== null) {
        if (n.data < up.data) {
          up.left = n.right;
          n.right.up = n.up;
        }
        else {
          up.right = n.right;
          n.right.up = n.up;
        }
      }
      else {
        this.binaryTree = n.right;
      }
    }
    else if (n.left !== null && n.right === null) {
      if (up !== null) {
        if (n.data < up.data) {
          up.left = n.left;
          n.left.up = n.up;
        }
        else {
          up.right = n.left;
          n.left.up = n.up;
        }
      }
      else {
        this.binaryTree = n.left;
      }
    }
    else {
      let left = n.left;
      let right = n.right;
      let min = findMinNode(right);
      min.left = left;
      left.up = min;
      if (up !== null) {
        if (n.data < up.data) {
          up.left = n.right;
          n.right.up = n.up;
        }
        else {
          up.right = n.right;
          n.right.up = n.up;
        }
      }
      else {
        this.binaryTree = n.right;
      }
    }
  }

  min() {
    if (this.binaryTree === null) return null;
    let n = this.binaryTree;
    while (true) {
      if (n.left !== null) {
        n = n.left;
        continue;
      }
      else return n.data;
    }
  }

  max() {
    if (this.binaryTree === null) return null;
    let n = this.binaryTree;
    while (true) {
      if (n.right !== null) {
        n = n.right;
        continue;
      }
      else return n.data;
    }
  }
}

module.exports = {
  BinarySearchTree
};