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

    let locX = mouseX - height / 2;
    let locY = mouseY - width / 2;

    // ambient light is gray
    ambientLight(50);
    // directional light is red
    directionalLight(255, 200, 0, 0.25, 0.25, 0);
     //point light is blue
    pointLight(0, 0, 255, locX, locY, 250);

    push();
    translate(-width / 4, 200*Math.random(), 100*Math.random());
    rotateZ(frameCount * 0.02);
    rotateX(frameCount * 0.02);
    noStroke();
    texture(img);
    emissiveMaterial(34, 139, 34);
    scale(2);
    model(shape);
    pop();


    

    orbitControl();

}