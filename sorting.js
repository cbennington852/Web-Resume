function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Define the sketch as a function
const sortingSketch = (p) => {
  let cols, rows;
  let size = 20;
  let c = [];
  let sorting_canvas;

  p.setup = function () {
    const canvasSize = p.windowWidth; // assuming canvasSize is based on window width
    sorting_canvas = p.createCanvas(canvasSize / 3, p.windowHeight / 2);
    sorting_canvas.parent("sorting_canvas_parent");

    cols = p.width / size;
    rows = p.height / size;
    for (let i = 0; i < cols; i++) {
      c[i] = [];
      for (let j = 0; j < rows; j++) {
        c[i][j] = p.color(p.random(256), p.random(256), p.random(256));
      }
    }
  };

  p.draw = function () {
    p.background(220);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        p.fill(c[i][j]);
        p.rect(i * size, j * size, size, size);
      }
      bubbleSortPass(c[i]);
    }

    let locX = p.floor(p.mouseX / size);
    let locY = p.floor(p.mouseY / size);
    if (!(locX < 1 || locY > rows - 1 || locY < 1 || locX > cols - 2)) {
      c[locX][locY] = p.color(p.random(256), p.random(256), p.random(256));
      c[locX + 1][locY] = p.color(p.random(256), p.random(256), p.random(256));
      c[locX][locY + 1] = p.color(p.random(256), p.random(256), p.random(256));
      c[locX + 1][locY + 1] = p.color(p.random(256), p.random(256), p.random(256));
      c[locX - 1][locY - 1] = p.color(p.random(256), p.random(256), p.random(256));
      c[locX][locY - 1] = p.color(p.random(256), p.random(256), p.random(256));
      c[locX - 1][locY] = p.color(p.random(256), p.random(256), p.random(256));
      c[locX - 1][locY + 1] = p.color(p.random(256), p.random(256), p.random(256));
    }
  };

  function bubbleSortPass(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      if (p.green(arr[i]) > p.green(arr[i + 1])) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      }
      sleep(10);
    }
    return arr;
  }

  p.getDeviceType = function () {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/(tablet|ipad)/i.test(userAgent)) return "tablet";
    if (/(android|iphone|ipod|blackberry|windows phone)/i.test(userAgent)) return "mobile";
    return "desktop";
  };
};

// Instantiate the sketch
new p5(sortingSketch);
