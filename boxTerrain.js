/*
----- Coding Tutorial by Patt Vira ----- 
Name: Oscillating Wave Pattern (3D)
Video Tutorial: https://youtu.be/8rBsaJcpItI

Connect with Patt: @pattvira
https://www.pattvira.com/
----------------------------------------
*/


let boxes = [];
let size = 20; let cols, rows;
let margin = 50; let scl = 50; let speed = 0.05;
let val = 0

function setup() {
  createCanvas(1000, 1000, WEBGL);
  noiseDetail(2, 0.25)
  cols = (width - margin*2)/size;
  rows = (height - margin*2)/size;
  
  for (let i=0; i<cols; i++) {
    boxes[i] = [];
    for (let j=0; j<rows; j++) {
      let x = -width/2 + margin + size/2 + i*size;
      let y = -height/2 + margin + size/2 + j*size; 
      let z = 0;
      let distance = dist(x, y, 0, 0);
      let angle = map(distance, 0, width/2, 0, TWO_PI * 2);
      boxes[i][j] = new Box(x, y, z, angle, scl, speed);
    }
  }
}

function draw() {
  background(0);
  orbitControl();
  
  for (let i=0; i<cols; i++) {
    for (let j=0; j<rows; j++) {
      boxes[i][j].update();
      boxes[i][j].display();
    }
  }
  
  
}


class Box {
  constructor(x, y, z, angle, scl, speed) {
    this.pos = createVector(x, y, z);
    this.initZ = this.pos.z;
    this.angle = (angle + val) % 360;
    this.scl =   noise(this.pos.x, this.pos.y, this.pos.z) * 800;
;
    this.speed = noise(this.pos.x, this.pos.y, this.pos.z) * 800;
;
    val += 1;
  }
  
  update() {
    this.pos.z = this.scl*sin(this.angle);
    this.angle += 0.01;
  }
  
  display() {
    noStroke();
    let diff = this.initZ - this.pos.z
    let r = map(sin(this.angle), -1, 1, 100, 255);
    let g = map(sin(this.angle + 2), -1, 1, 100, 255);
    let b = map(sin(this.angle + 4), -1, 1, 100, 255);
    fill(r, g, b);
    
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(size);
    pop();
  }
}