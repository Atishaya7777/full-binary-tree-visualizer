let treeHeight = 4; // Change the height of the tree here

function exportTree() {
  saveCanvas("binary_tree", "png");
}

function setHeight(height) {
  treeHeight = height;
}

class Node {
  constructor(value, x, y) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = x;
    this.y = y;
    this.distance = 2;
  }

  addNode(value) {
    if (this.left === null) {
      this.left = new Node(
        value,
        this.x - width / pow(2, this.distance),
        this.y + 20
      );
    } else {
      this.left.addNode(value);
      this.distance++;
    }

    if (this.right === null) {
      this.right = new Node(
        value,
        this.x + width / pow(2, this.distance),
        this.y + 20
      );
    } else {
      this.right.addNode(value);
      this.distance++;
    }
  }

  show(x, y, levelWidth) {
    fill(255);
    if (this.left !== null) {
      line(x, y, this.left.x, this.left.y);
      this.left.show(this.left.x, this.left.y, levelWidth / 2);
    }

    if (this.right !== null) {
      line(x, y, this.right.x, this.right.y);
      this.right.show(this.right.x, this.right.y, levelWidth / 2);
    }

    ellipse(x, y, 30, 30); // Adjust the size of the nodes as needed
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  addValue(value) {
    if (this.root === null) {
      this.root = new Node(value, width / 2, 50);
    } else {
      this.root.addNode(value);
    }
  }

  display() {
    if (this.root !== null) {
      let startX = width / 2;
      let startY = 50;
      let levelWidth = width / pow(2, this.getHeight());
      this.root.show(startX, startY, levelWidth);
    }
  }

  getHeight(node = this.root) {
    if (node === null) {
      return 0;
    }
    let leftHeight = this.getHeight(node.left);
    let rightHeight = this.getHeight(node.right);
    return 1 + max(leftHeight, rightHeight);
  }
}

let binaryTree;

function setup() {
  createCanvas(800, 600);
  binaryTree = new BinaryTree();

  for (let i = 0; i < treeHeight; i++) {
    binaryTree.addValue(1); // Add random values for demonstration
  }
}

function draw() {
  background(220);

  binaryTree.display();
}
