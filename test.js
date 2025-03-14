let shape;
let img;

function setup() {
    createCanvas(710, 400, WEBGL);

    describe(
        'a 3d example containing a spinning box and a sphere, each lit with a number of different lights, including ambient (gray), directional (red), spotlight (green), and point (blue).'
    );

    shape = loadModel('./assets/fish.obj', true);
}

function preload() {
    print("wefwefwe");
    img = loadImage('assets/fish_texture.png');
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
    let k = (mouseX + mouseY) / 50;
    noStroke();
    texture(img);
    model(shape, 100);
    pop();

    push();
    translate(-width / 4, 0, 0);
    rotateZ(frameCount * 0.02);
    rotateX(frameCount * 0.02);
    torus(100,10,100)
    pop();




    orbitControl();



}