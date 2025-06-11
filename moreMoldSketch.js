// Set up canvas

 let d; let molds = []; let moldNum = 10000;
 let canvasSize = 500;
 let points = [];
let circleX, circleY;
let spawnPoints = [];

let moldColor = 150;
let ringDensity = 500;
let clickType = false;

function preload () {
    font = loadFont("fonts/Roboto-Regular.ttf");

    let controls = document.getElementById('moldControls');


    const elements = document.querySelectorAll('.setting');

    elements.forEach(element => {
        element.addEventListener('click', function(event) {
            molds = [];
            moldNum = document.getElementById('moldNum').value;
            moldColor = document.getElementById('moldColor').value;
            ringDensity = document.getElementById('ringDensity').value;
            setup();
        });
    });
}

let slider;

function setup() {
    canvas = createCanvas(canvasSize, canvasSize);
    canvas.parent("canvas-container"); // Attach to the div
    angleMode(DEGREES);


    d = pixelDensity();
    //moldControls

    spawnPoints = font.textToPoints("OOO", 0,300, 300, {
        sampleFactor: 0.1,
    });

    //spawns them in a circle. 

    const centerY = canvasSize / 2;
    const centerX = canvasSize / 2;
    const radius = 120;


    for (let i = 0; i < moldNum; i++) {
        const angle = (i / moldNum) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        molds[i] = new mold(x,y, canvasSize, moldColor, ringDensity);
    }

    for (let i = 0; i < moldNum; i++) {
        const angle = (i / moldNum) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        molds[i] = new mold(x,y, canvasSize, moldColor, ringDensity);
    }
}

function reset() {
    setup();
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
