let treeHeight = 4;

function setHeight(height) {
  treeHeight = height;
  updateTree();
}

function draw() {
  background(255);
  if (root) {
    root.draw();
  }
}

function updateTree() {
  let startX = width / 2;
  let startY = 50;
  let numNodes = pow(2, treeHeight) - 1;
  let horizontalSpacing = width / numNodes + numNodes * 5;
  root = new TreeNode(startX, startY, horizontalSpacing, treeHeight);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  updateTree();
}

class TreeNode {
  constructor(x, y, horizontalSpacing, levels) {
    this.x = x;
    this.y = y;
    this.horizontalSpacing = horizontalSpacing;
    this.levels = levels;
  }

  draw() {
    this.drawNode(this.x, this.y, this.horizontalSpacing, this.levels);
  }

  drawNode(x, y, spacing, levels) {
    if (levels > 0) {
      if (levels !== 1) {
        line(x, y, x - spacing, y + 50);
        line(x, y, x + spacing, y + 50);
      }
      // Draw the node
      fill(255);
      ellipse(x, y, 20, 20);
      // Draw left child
      this.drawNode(x - spacing, y + 50, spacing / 2, levels - 1);
      // Draw right child
      this.drawNode(x + spacing, y + 50, spacing / 2, levels - 1);
      // Draw connecting lines
    }
  }
}

function exportTree() {
  saveCanvas("perfect-binary-tree-level-" + treeHeight, "png");
}
