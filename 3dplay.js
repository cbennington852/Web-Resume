let shape;
let img;

function setup() {
    createCanvas(710, 400, WEBGL);

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
    pointLight(0, 0, 255, locX, locY, 250);

    push();
    translate(-width / 4, 0, 0);
    rotateZ(frameCount * 0.02);
    rotateX(frameCount * 0.02);
    torus(100,10,100)
    pop();

    push();
    translate(-75, 100, 0);

    // Show black stroke to help visualize movement
    stroke(50);
    sphere(50);
    pop();

    orbitControl();



}