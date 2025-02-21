

let colsRose, rowsRose; let sizeRose = 10;
let threshold = 0.5; let t = 0;

function sketch1(p) {
    p.setup = function () {
        p.roseCanvas = p.createCanvas(400, 400);
        p.roseCanvas.parent("canvas-roseCanvas"); // Attach to the div

        colsRose = p.width / sizeRose;
        rowsRose = p.height / sizeRose;
        p.textSize(sizeRose);
        p.textAlign(p.CENTER, p.CENTER);
    };

    p.draw = function () {
        p.background(0);
        //console.log(colsRose);
        for (let i=0; i<colsRose; i++) {
            for (let j=0; j<rowsRose; j++) {
                let x = sizeRose/2 + i*sizeRose;
                let y = sizeRose/2 + j*sizeRose;
                let d = p.dist(x, y, p.width/2, p.height/2);
                let k = 10;

                let dx = x - p.width/2;
                let dy = y - p.height/2;
                let angle = Math.atan2(dy, dx);

                let spiralPath = Math.sin(d / k + angle + t);

                let distanceFactor = 100+p.mouseX-p.mouseY;
                let angleFactor = 5;
                let condition = Math.sin(d / distanceFactor + angleFactor*angle);

                let symbol;
                let c;
                if (spiralPath > condition) {
                    symbol = "X";
                    c = colorGradient(d);
                } else {
                    symbol = ".";
                    c = p.color(255, 100);
                }

                p.fill(c);
                p.text(symbol, x, y); // This line was missing!

            }
        }

        t -= 0.01;
    };
    /*

    p.draw = function () {
        p.background(0); // Keep the background clear
        p.fill(255, 0, 0); // Red color
        p.ellipse(p.width / 2, p.height / 2, 50, 50); // Draw a red circle in the center
    };
*/
    function colorGradient(d) {
        let colors = [p.color(252, 176, 69), p.color(p.mouseY, 58, p.mouseX)];

        let colorRadius = 120;
        let amt = d % colorRadius / colorRadius;

        return p.lerpColor(colors[0], colors[1], amt);
    }
}

// Run first p5 instance
new p5(sketch1);



/*
// Uncomment for more colors
function colorGradient(d) {
  let colors = [
    color(252, 176, 69),
    color(253, 29, 29),
    color(131, 58, 180),
    color(0, 255, 0)
  ];

  let colorRadius = 50;
  let colorNum = colors.length;
  let amt = d % (colorNum * colorRadius) / (colorNum * colorRadius);

  if (amt < 1 / colorNum) {
    return lerpColor(colors[0], colors[1], amt * colorNum);
  } else if (amt < 2 / colorNum) {
    return lerpColor(colors[1], colors[2], (amt - 1 / colorNum) * colorNum);
  } else if (amt < 3 / colorNum) {
    return lerpColor(colors[1], colors[3], (amt - 2 / colorNum) * colorNum);
  } else {
    return lerpColor(colors[2], colors[0], (amt - 3 / colorNum) * colorNum);
  }
}
*/



