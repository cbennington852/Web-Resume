// Set up canvas


class index_file_mold {
		constructor (startingPosX, startingPosY , moldColor , p , canvasSize) {
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

			this.rSensorPos = p.createVector(0,0);
			this.fSensorPos = p.createVector(0,0);
			this.lSensorPos = p.createVector(0,0);
			this.sensorAngle = 45;
			this.sensorDist = 5;
			this.colorF = 0;
			this.colorR = 0;
			this.colorL = 0;

		}

		update () {
			const width = this.p.floor(this.p.width);
			const height = this.p.floor(this.p.height);

			this.vx = this.p.cos(this.heading);
			this.vy = this.p.sin(this.heading);

			this.x = (this.x + this.vx) % width;
			this.y = (this.y + this.vy) % height;

			if (this.x <= 0 ){
				this.x = this.canvasSize;
			}
			if (this.y <= 0 ){
				this.y = this.canvasSize;
			}

		
			this.rSensorPos.x = this.x + this.sensorDist*this.p.cos(this.heading + this.sensorAngle);
			this.rSensorPos.y = this.y + this.sensorDist*this.p.sin(this.heading + this.sensorAngle);

			this.lSensorPos.x = this.x + this.sensorDist*this.p.cos(this.heading - this.sensorAngle);
			this.lSensorPos.y = this.y + this.sensorDist*this.p.sin(this.heading - this.sensorAngle);

			this.fSensorPos.x = this.x + this.sensorDist*this.p.cos(this.heading);
			this.fSensorPos.y = this.y + this.sensorDist*this.p.sin(this.heading);

			const getPixelValue = (v) => {
				// 1. Constrain to canvas bounds so we don't go out of array range
				let x = this.p.constrain(this.p.floor(v.x), 0, width - 1);
				let y = this.p.constrain(this.p.floor(v.y), 0, height - 1);
				
				// 2. Calculate index and ensure it is an INTEGER using Math.floor or | 0
				let index = 4 * (d * y * d * width + d * x);
				index = Math.floor(index); 
				
				// Return the Red channel (pixels[index])
				return this.p.pixels[index];
			};

			let index,l,f,r = 0;
			let index_r = 0;
			let index_f = 0;
			let index_l = 0;
			r = getPixelValue(this.rSensorPos);
			f = getPixelValue(this.fSensorPos);
			l = getPixelValue(this.lSensorPos);


			console.log("Curr" , r , f , l);
			console.log("LFR" , index_r , index_f , index_l);

			this.colorF = (f + this.color)%255;
			this.colorR = (this.r)%255;
			this.colorL = (l)%255 + 70;

			if ((f > l) && (f > r)) {
				this.heading += 0;
			}
			else if (f < l && f < r) {
				if (this.p.random(1) < 0.5) {
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
			this.p.noStroke();
			this.p.fill(this.colorL,this.colorF,this.colorR);
			this.p.ellipse(this.x%this.canvasSize, this.y%this.canvasSize, this.r*6, this.r*6);
		}
}


function sketch_mold (p) {
    let new_molds = []; let moldNum = 500;
    let canvasSize = p.floor(window.innerWidth);


    p.setup = () => {
        canvas = p.createCanvas(canvasSize/3, window.innerHeight/2);
        canvas.parent("canvas-container"); // Attach to the div
        p.angleMode(p.DEGREES);

        d = p.pixelDensity();
		console.log("Pixel dense" , d);
        for (let i = 0; i < moldNum; i++) {
            new_molds[i] = new index_file_mold(i%canvasSize,i%canvasSize,  90 , p , canvasSize);
        }
    };

	p.draw = () => {
	    p.background(0,5);
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






