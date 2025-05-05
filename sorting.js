let cols; let rows;
let size = 15;
let c = [];

function setup() {
    if (getDeviceType() === 'mobile') {
        createCanvas(600, 800);
    }
    else {
        createCanvas(800, 500);
    }

    cols = width/size;
    rows = height/size;
    for (let i=0; i<cols; i++){
        c[i] = [];
        for (let j=0; j<rows; j++){
            c[i][j] = color(random(256), random(256), random(256));
        }
    }
    // print(c);
}

function draw() {
    background(220);
    for (let i=0; i<cols; i++){
        for (let j=0; j<rows; j++){
            fill(c[i][j]);
            rect(i*size, j*size, size, size);
        }
        //change the color.
        bubbleSortPass(c[i]);
        sleep(100);
        //also sort horizantally.
    }

    //get which rect the mouse is on, and randomise those pixels
    let locX = floor(mouseX / size);
    let locY = floor(mouseY / size);
    console.log(locX, locY);
    console.log(typeof locY, typeof locX);
    if (!(locX < 1 || locY > (rows-1) || locY < 1 || locX > (cols-2))){
        c[locX][locY] = color(random(256), random(256), random(256));
        c[locX+1][locY] = color(random(256), random(256), random(256));
        c[locX][locY+1] = color(random(256), random(256), random(256));
        c[locX+1][locY+1] = color(random(256), random(256), random(256));
        c[locX-1][locY-1] = color(random(256), random(256), random(256));
        c[locX][locY-1] = color(random(256), random(256), random(256));
        c[locX-1][locY] = color(random(256), random(256), random(256));
        c[locX-1][locY+1] = color(random(256), random(256), random(256));

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/(tablet|ipad)/i.test(userAgent)) {
        return "tablet";
    } else if (
        /(android|iphone|ipod|blackberry|windows phone)/i.test(userAgent)
    ) {
        return "mobile";
    } else {
        return "desktop";
    }
}

function bubbleSortPass(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        if (green(arr[i]) > green(arr[i + 1])) {
            // Swap arr[i] and arr[i + 1]
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    }
    return arr;
}