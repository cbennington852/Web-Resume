let font;
let points = [];
let sizes = [];
let cols; let rows; let size = 10;
let xoff = 0; let yoff = 0; let zoff = 0;
let inc = 10;

function preload () {
    font = loadFont("fonts/Roboto-Regular.ttf");
}

function setup() {
    createCanvas(400, 400);
    cols = width/size;
    rows = height/size;

    rectMode(CENTER);
    points = font.textToPoints("A", 0,180, 180, {
        sampleFactor: 0.1,
    });
    console.log(points);
}

function draw() {
    background(220);
    xoff = 0;
    for (let i = 0; i < cols; i++) {
        sizes[i] = [];
        yoff = 0;
        for (let j = 0; j < rows; j++) {
            sizes[i][j] = map(noise(xoff, yoff, zoff), 0, 1, 0, size * 1.7);
            yoff += inc;
        }
        xoff += inc;
        zoff += 0.0005;
    }

    /*
    for (let i = 0; i < points.length-1; i++)
    {
        //line(points[i].x, points[i].y, points[i+1].x, points[i+1].y, 2);
        rect(points[i].x, points[i].y,5, 5);
        fill('black');
    }
    */


    for (let i = 0; i < cols; i++) {

        for (let j = 0; j < rows; j++) {
            rect(i * size, j * size, sizes[i][j], sizes[i][j]);

            let r = noise(zoff) * 255;
            let g = noise(zoff + 10) * 255;
            let b = noise(zoff + 10) * 255;

            fill(r, g, b);
        }
    }
}

