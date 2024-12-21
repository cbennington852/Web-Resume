let cols; let rows;
let spacing = 20;
let size = [];
let scale = 0.1;
let canvas;
const pageWidth = document.documentElement.scrollWidth;

const gridSketch = (l) => {

    l.setup= () => {

        canvas = l.createCanvas(pageWidth, window.innerHeight);
        console.log(pageWidth, window.innerHeight );
        canvas.parent("backgroundCanvas"); // Attach to the div
        cols = width/spacing;
        rows = height/spacing;
        l.rectMode(CENTER);
    }

    l.draw =() => {
        l.background(40);

        for (let i = 0; i < cols; i++) {
            size[i]  = [];
            for (let j = 0; j < rows; j++) {
                l.fill(0);
                l.noStroke();
                size[i][j] = l.dist(mouseX, mouseY, spacing/2+i*spacing, spacing/2+j*spacing) * scale;
            }
        }

        for (let i = 0; i < cols; i++) {

            for (let j = 0; j < rows; j++) {
                l.rect(spacing/2 + i*spacing, spacing/2 + j*spacing, size[i][j], size[i][j]);
            }

        }

        l.rect(500,500,100,100);
    }
}

// Create instances of the sketches
new p5(gridSketch); // Links to an HTML element with id="container1"
/*
function draw() {
    background(0); // Clear the background on each frame

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            // Calculate distance from mouse to square center
            let d = dist(mouseX, mouseY, spacing / 2 + i * spacing, spacing / 2 + j * spacing);

            // Update size if mouse is close
            if (d < 100) { // Only squares within distance 100 will react
                size[i][j] = map(d, 0, 100, spacing, 5); // Map distance to size
            } else {
                size[i][j] = lerp(size[i][j], 5, 0.1); // Gradually shrink back to 5
            }

            // Draw squares
            fill(15);
            rect(spacing / 2 + i * spacing, spacing / 2 + j * spacing, size[i][j], size[i][j]);
        }
    }
}
*/


