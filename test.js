let shape;
let img;

function setup() {
    createCanvas(800, 800, WEBGL);

    describe(
        'a 3d example containing a spinning box and a sphere, each lit with a number of different lights, including ambient (gray), directional (red), spotlight (green), and point (blue).'
    );

    shape = loadModel('./assets/fish.obj', true);
}

function preload() {
    print("wefwefwe");
    img = loadImage('assets/fish_texture.png');
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
    background(0);

    ambientLight(255);
    // directional light is red
    let c = color(255, 45, 30);
    directionalLight(c, mouseX, mouseY, 0);
     //point light is blue

    push();
    translate(-width / 4, 200, 100);
    rotateZ(frameCount * 0.02);
    rotateX(frameCount * 0.02);
    noStroke();
    texture(img);
    scale(2);
    model(shape);
    pop();

    orbitControl();

}