// Set up canvas

 let d; let molds = []; let moldNum = 3000;
 let canvasSize = 400;
 let points = [];
let circleX, circleY;
let spawnPoints = [];

function preload () {
    font = loadFont("fonts/Roboto-Regular.ttf");
}

function setup() {
    canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent("canvas-container"); // Attach to the div
    angleMode(DEGREES);

    d = pixelDensity();

    spawnPoints = font.textToPoints("OOO", 0,300, 300, {
        sampleFactor: 0.1,
    });

    for (let i = 0; i < moldNum; i++) {
        molds[i] = new mold(i%canvasSize,i%canvasSize, canvasSize, 90);
    }

    //spawns them in a circle. 
    /*
    const centerY = canvasSize / 2;
    const centerX = canvasSize / 2;
    const radius = 120;

    for (let i = 0; i < moldNum; i++) {
        const angle = (i / moldNum) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        molds[i] = new mold(x,y, canvasSize);
    }
     */

}


function draw() {
    background(0,5);
    loadPixels();

    for (let i = 0; i < moldNum; i++) {
        molds[i].display();
        molds[i].update();
    }
}

// Called whenever the mouse is pressed
function mousePressed() {
    // Check if the mouse is inside the canvas
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        console.log("Mouse clicked at:", mouseX, mouseY);
        fill(255, 0, 0);
        ellipse(mouseX, mouseY, 200, 200); // Draw a red circle where clicked
    }
}
