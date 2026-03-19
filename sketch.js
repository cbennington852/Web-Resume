// Set up canvas
let canvasSize = Math.floor(window.innerWidth);
const width = Math.floor(canvasSize / 3);
const length = Math.floor(window.innerHeight / 2);

class index_file_mold {

	constructor(startingPosX, startingPosY, moldColor, p, canvasSize) {
		this.d = p.pixelDensity();
		this.p = p;
		this.canvasSize = canvasSize;
		this.x = startingPosX;
		this.y = startingPosY;
		this.r = 0.5;
		this.color = moldColor;

		this.heading = p.random(360);
		this.vx = p.cos(this.heading);
		this.vy = p.sin(this.heading);
		this.rotAngle = 45;

		this.rSensorPos = p.createVector(0, 0);
		this.fSensorPos = p.createVector(0, 0);
		this.lSensorPos = p.createVector(0, 0);
		this.sensorAngle = 45;
		this.sensorDist = 10;
	}

	update() {


		this.vx = this.p.cos(this.heading);
		this.vy = this.p.sin(this.heading);

		this.x = (this.x + this.vx + width) % width;
		this.y = (this.y + this.vy + length) % length;

		this.getSensorPos(this.rSensorPos, this.heading + this.sensorAngle);
		this.getSensorPos(this.lSensorPos, this.heading - this.sensorAngle);
		this.getSensorPos(this.fSensorPos, this.heading);

		// Get indices of the 3 sensor positions and get the color values from those indices
		let index, l, r, f;
		d = this.d;
		console.log("Density: " , this.d);
		console.log("length: " , this.p.pixels.length);
		console.log("Width: " ,width);
		index = 4 * (d * Math.floor(this.rSensorPos.y)) * (d * width) + 4 * (d * Math.floor(this.rSensorPos.x));
		r = this.p.pixels[index];
		console.log(index);

		index = 4 * (d * Math.floor(this.lSensorPos.y)) * (d * width) + 4 * (d * Math.floor(this.lSensorPos.x));
		l = this.p.pixels[index];
		console.log(index);


		index = 4 * (d * Math.floor(this.fSensorPos.y)) * (d * width) + 4 * (d * Math.floor(this.fSensorPos.x));
		f = this.p.pixels[index];
		console.log(index);


		// Compare values of f, l, and r to determine movement 
		console.log(f , l ,r);
		if (f > l && f > r) {
			this.heading += 0;
		} else if (f < l && f < r) {
			if (this.p.random(1) < 0.5) {
				this.heading += this.rotAngle;
			} else {
				this.heading -= this.rotAngle;
			}
		} else if (l > r) {
			this.heading += -this.rotAngle;
		} else if (r > l) {
			this.heading += this.rotAngle;
		}
	}

	getSensorPos(sensor, angle) {
		sensor.x = (this.x + this.sensorDist * this.p.cos(angle) + width) % width;
		sensor.y = (this.y + this.sensorDist * this.p.sin(angle) + length) % length;
	}

	display() {
		this.p.noStroke();
		this.p.fill(255 , 255 , 255);
		this.p.ellipse(this.x % this.canvasSize, this.y % this.canvasSize, this.r * 2, this.r * 2);
	}
}


function sketch_mold(p) {
	let new_molds = []; let moldNum = 500;
	

	p.setup = () => {
		canvas = p.createCanvas(width, length );
		canvas.parent("canvas-container"); // Attach to the div
		p.angleMode(p.DEGREES);

		d = p.pixelDensity();
		console.log("Pixel dense", d);
		for (let i = 0; i < moldNum; i++) {
			new_molds[i] = new index_file_mold(i % canvasSize, i % canvasSize, 90, p, canvasSize);
		}
	};

	p.draw = () => {
		p.background(0, 5);
		p.loadPixels();

		for (let i = 0; i < moldNum; i++) {
			new_molds[i].display();
			new_molds[i].update();
		}
	};


	// Called whenever the mouse is pressed
	p.mousePressed = () => {
		// Check if the mouse is inside the canvas
		if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
			p.fill(255, 0, 0);
			p.ellipse(p.mouseX, p.mouseY, 200, 200); // Draw a red circle where clicked
		}
	};

};

new p5(sketch_mold);






