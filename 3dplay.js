let shape;
let img;
let roseCanvas

function setup() {
    
    roseCanvas = createCanvas(200, 200, WEBGL);;
    roseCanvas.parent("canvas-roseCanvas"); // Attach to the div

}

function preload() {
}

function draw() {
    background(0);

    let locX = mouseX - height / 2;
    let locY = mouseY - width / 2;

    // ambient light is gray
    ambientLight(50);
    // directional light is red
    directionalLight(255, 0, 0, 0.25, 0.25, 0);
     //point light is blue
    pointLight(0, 0, 0, locX, locY, 250);

    push();
    translate(-width / 4, 0, 0);
    rotateZ(frameCount * 0.02);
    rotateX(frameCount * 0.02);
     box(70, 70, 70);
    pop();


    orbitControl();

}