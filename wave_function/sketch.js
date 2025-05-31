// Source image
let sourceImage;
// Tiles extracted from the source image
let tiles;
// Number of cells along one dimension of the grid
let DIM = 50;
// Maximum depth for recursive checking of cells
let maxDepth = 5;
// Grid of cells for the Wave Function Collapse algorithm
let grid = [];
let thangs = []; 
let molds = [];
let d;

function preload() {
  sourceImage = loadImage("images/city_green.png");
}

let canvasX = 500;
let canvasY = 500;
let canvasSize = canvasY;
function setup() {
  createCanvas(canvasX, canvasY);

  // Extract tiles and calculate their adjacencies
  let w = width / DIM;
  tiles = extractTiles(sourceImage);
  for (let tile of tiles) {
    tile.calculateNeighbors(tiles);
  }

  // Initialize the grid with cells
  let count = 0;
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {
      grid.push(new Cell(tiles, i * w, j * w, w, count));
      count++;
    }
}

  // Perform initial wave function collapse step
  wfc();
}

/*
function keyPressed() {
    if (key === 'w') {
        for (let k =0; k < thangs.length; k ++) {
            thangs[k].change(0, -5);
            thangs[k].display();
        }
    }
    if (key === 'a') {
        for (let k =0; k < thangs.length; k ++) {
            thangs[k].change(-5, 0);
            thangs[k].display();
        }
    }
    if (key === 's') {
        for (let k =0; k < thangs.length; k ++) {
            thangs[k].change(0, 5);
            thangs[k].display();
        }
    }
    if (key === 'd') {
        for (let k =0; k < thangs.length; k ++) {
            thangs[k].change(5, 0);
            thangs[k].display();
        }
    }
}
*/
function draw() {
  background(0);

  
  // Width of each cell on the grid
  let w = width / DIM;

  // Show the grid
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
    // Reset all cells to "unchecked"
    grid[i].checked = false;
  }

  // Run Wave Function Collapse!
  wfc();

  for (let i = 0; i < molds.length; i++) {
        molds[i].display();
        molds[i].update();
    }

  /*
  for (let k =0; k < thangs.length; k ++) {
    thangs[k].move();
    thangs[k].display();
  }
    */
}


// The Wave Function Collapse algorithm
function wfc() {

  // Make a (shallow) copy of grid
  let gridCopy = grid.slice();

  // Remove any collapsed cells from the copy
  gridCopy = gridCopy.filter((a) => !a.collapsed);

  // We're done if all cells are collapsed!
  if (gridCopy.length == 0) {
    noLoop();
    return;
  }

  // Sort cells by "entropy"
  // (simplified formula of number of possible options left)
  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  // Identify all cells with the lowest entropy
  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 1; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }
  if (stopIndex > 0) gridCopy.splice(stopIndex);

  // Randomly select one of the lowest entropy cells to collapse
  const cell = random(gridCopy);
  cell.collapsed = true;

  // Choose one option randomly from the cell's options
  const pick = random(cell.options);
  
  // If there are no possible tiles that fit there!
  if (pick == undefined) {
    console.log("ran into a conflict");
    //noLoop();
    console.log(cell);
    
  }
  
  // Set the file tile
  cell.options = [pick];

  // Propagate entropy reduction to neighbors
  reduceEntropy(grid, cell, 0);
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}


function reduceEntropy(grid, cell, depth) {
  // Stop propagation if max depth is reached
  if (depth > maxDepth) return;
  
  // Or if cell is already checked
  if (cell.checked) return;
  
  // Set the cell to be checked
  cell.checked = true;

  
  // Find the cell  
  let index = cell.index;
  let i = floor(index % DIM);
  let j = floor(index / DIM);

  // Update neighboring cells based on adjacency rules

  // RIGHT
  if (i + 1 < DIM) {
    let rightCell = grid[i + 1 + j * DIM];
    let checked = checkOptions(cell, rightCell, TRIGHT);
    if (checked) {
      reduceEntropy(grid, rightCell, depth + 1);
    }
  }

  // LEFT
  if (i - 1 >= 0) {
    let leftCell = grid[i - 1 + j * DIM];
    let checked = checkOptions(cell, leftCell, TLEFT);
    if (checked) {
      reduceEntropy(grid, leftCell, depth + 1);
    }
  }

  // DOWN
  if (j + 1 < DIM) {
    let downCell = grid[i + (j + 1) * DIM];
    let checked = checkOptions(cell, downCell, TDOWN);
    if (checked) {
      reduceEntropy(grid, downCell, depth + 1);
    }
  }

  // UP
  if (j - 1 >= 0) {
    let upCell = grid[i + (j - 1) * DIM];
    let checked = checkOptions(cell, upCell, TUP);
    if (checked) {
      reduceEntropy(grid, upCell, depth + 1);
    }
  }
}

function checkOptions(cell, neighbor, direction) {
  // If it's a valid non-collapsed neighbord
  if (neighbor && !neighbor.collapsed) {
    // Collect valid options based on the current cell's adjacency rules
    let validOptions = [];
    for (let option of cell.options) {
      validOptions = validOptions.concat(tiles[option].neighbors[direction]);
    }

    // Filter the neighbor's options to retain only those that are valid
    neighbor.options = neighbor.options.filter((elt) =>
      validOptions.includes(elt)
    );

    // Return true if the options were successfully reduced
    return true;
  } else {
    // Return false if the neighbor is already collapsed or invalid
    return false;
  }
}