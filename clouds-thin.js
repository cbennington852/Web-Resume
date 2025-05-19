// Noise tends to look smoother with coordinates that are very close together
// These values will be multiplied by the x and y coordinates to make the
// resulting values very close together
let xScale = 0.015;
let yScale = 0.02;

let gapSlider;
let gap;
let offsetSlider;
let offset;
let canvas;

function setup() {
    canvas = createCanvas(window.innerWidth, 50);
    canvas.parent("canvas-roseCanvas");

    background('#222222');
    // Draw the grid
    dotGrid();


}

function draw() {
    clear();
    dotGrid();
    attribute += 1;
    noiseDetail(4, 0.6);
}

let attribute = 0;
function dotGrid() {
    noStroke();
    fill(255);

    // Get the current gap and offset values from the sliders
    gap = 4;
    offset = 1;



    // Loop through x and y coordinates, at increments set by gap
    for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
            // Calculate noise value using scaled and offset coordinates
            let noiseValue = noise((x + offset + attribute) * xScale,  (y + offset + attribute) * yScale);
            //calculate the color?
            let c;
            
            if (noiseValue > 0.9) {
                c = color(255*noiseValue, 100*noiseValue, 255*random());
            }
            if (noiseValue > 0.7) {
                c = color(255*noiseValue, 100*noiseValue, 60*random());
            }
            else if (noiseValue > 0.6) {
                c = color(255*noiseValue, 50*noiseValue, 30*random());
            }
            else if (noiseValue > 0.5) {
                c = color(255*noiseValue, 100*noiseValue, 10*random());
            }
            else {
                c = color(255*noiseValue, 50*noiseValue, 0);
            }
            fill(c);
            // Since noiseValue will be 0-1, multiply it by gap to set diameter to
            // between 0 and the size of the gap between circles
            let diameter = noiseValue * gap;
            square(x, y, diameter);
        }
    }
}