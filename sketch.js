// Set up canvas

const sketch_mold = (p) => {
    let d; let molds = []; let moldNum = 2000;
    let canvasSize = window.innerWidth;
    let points = [];
    let circleX, circleY;
    let spawnPoints = [];

    p.setup = () => {
        canvas = p.createCanvas(canvasSize/3, window.innerHeight/2);
        canvas.parent("canvas-container"); // Attach to the div
        p.angleMode(p.DEGREES);

        d = p.pixelDensity();

        for (let i = 0; i < moldNum; i++) {
            molds[i] = new mold(i%canvasSize,i%canvasSize,  90 , p);
        }
    };

	p.draw = () => {
	    p.background(0,5);
	    p.loadPixels();
	
	    for (let i = 0; i < moldNum; i++) {
	        molds[i].display();
	        molds[i].update();
	    }
	};


	// Called whenever the mouse is pressed
	p.mousePressed = () => {
	    // Check if the mouse is inside the canvas
	    if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
	        console.log("Mouse clicked at:", p.mouseX, p.mouseY);
	        p.fill(255, 0, 0);
	        p.ellipse(p.mouseX, p.mouseY, 200, 200); // Draw a red circle where clicked
	    }
	};

	class mold {
		constructor (startingPosX,startingPosY , moldColor , p) {
			this.p = p;
			this.x = startingPosX;
			this.y = startingPosY;
			this.r = 0.5;
			this.color = moldColor;

			this.heading = p.random(360);
			this.vx = p.cos(this.heading);
			this.vy = p.sin(this.heading);
			this.rotAngle = 45;

			this.rSensorPos = p.createVector(0,0);
			this.fSensorPos = p.createVector(0,0);
			this.lSensorPos = p.createVector(0,0);
			this.sensorAngle = 45;
			this.sensorDist = 10;
			this.colorF = 0;
			this.colorR = 0;
			this.colorL = 0;

		}

		update () {

			this.vx = p.cos(this.heading);
			this.vy = p.sin(this.heading);

			this.x = (this.x + this.vx) % p.width;
			this.y = (this.y + this.vy) % p.height;

			this.rSensorPos.x = this.x + this.sensorDist*p.cos(this.heading + this.sensorAngle);
			this.rSensorPos.y = this.y + this.sensorDist*p.sin(this.heading + this.sensorAngle);

			this.lSensorPos.x = this.x + this.sensorDist*p.cos(this.heading - this.sensorAngle);
			this.lSensorPos.y = this.y + this.sensorDist*p.sin(this.heading - this.sensorAngle);

			this.fSensorPos.x = this.x + this.sensorDist*p.cos(this.heading);
			this.fSensorPos.y = this.y + this.sensorDist*p.sin(this.heading);

			let index, l, r,f;
			index = 4*(d * p.floor(this.rSensorPos.y)) * (d * p.width) + 4*(d * p.floor(this.rSensorPos.x));
			r = p.pixels[index];

			index = 4*(d * p.floor(this.fSensorPos.y)) * (d * p.width) + 4*(d * p.floor(this.fSensorPos.x));
			f = p.pixels[index];

			index = 4*(d * p.floor(this.lSensorPos.y)) * (d * p.width) + 4*(d * p.floor(this.lSensorPos.x));
			l = p.pixels[index];

			this.colorF = (f + this.color)%255;
			this.colorR = (r)%255;
			this.colorL = (l)%255 + 70;

			if ((f > l) && (f > r)) {
				this.heading += 0;
			}
			else if (f < l && f < r) {
				if (p.random(1) < 0.5) {
					this.heading += this.rotAngle;
				}
				else {
					this.heading -= this.rotAngle;
				}
			}
			else if (l > r) {
				this.heading += -this.rotAngle;
			}
			else if (r > l) {
				this.heading += this.rotAngle;
			}


		}
		

		display () {
			p.noStroke();
			p.fill(this.colorL,this.colorF,this.colorR);
			p.ellipse(this.x%canvasSize, this.y%canvasSize, this.r*2, this.r*2);

			// line(this.x, this.y, this.x + this.r*3*this.vx, this.y + this.r*3*this.vy );
			// fill('red');
			// ellipse(this.rSensorPos.x, this.rSensorPos.y, this.r*3, this.r*3);
			// ellipse(this.fSensorPos.x, this.fSensorPos.y, this.r*3, this.r*3);
			// ellipse(this.lSensorPos.x, this.lSensorPos.y, this.r*3, this.r*3);
		}
	}

	
};

new p5(sketch_mold);






