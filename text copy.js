

const sketch_thing = (p) => {
    let canvasSize = window.innerWidth;
    const height = canvasSize/3;
    const width = window.innerWidth/2;
    let color = 0;
    let mouse_w = 0;
    let d= 10;
    let bubbles = [];
    const num_bubbles = 20;
    p.setup = () => {
        canvas = p.createCanvas( height , width);
        canvas.parent("canvas-roseCanvas"); // Attach to the div
        p.angleMode(p.DEGREES);
        for (let x = 0; x < num_bubbles; x++) {
            bubbles.push(new Bubble(x , color , 50, p));
        }
    }

	/*******/

    p.draw = () => {
        


        p.fill(p.color(color , (color - mouse_w) % 160 , (color + mouse_w) % 160)); // White circle
        color = (color + 1) % 250;
        p.noStroke();
        p.circle(p.mouseX, p.mouseY, 50);

  
        

        for (let x = 0; x < num_bubbles; x++) {
            bubbles[x].update();
            bubbles[x].display();
        }

       p.noStroke();
        p.fill(0, 0, 0, 3); // Black with low alpha for slow fade
        p.rect(0, 0, p.width, p.height);
    }

    p.mouseWheel = () => {
        mouse_w  = (mouse_w + 5) % 255;
    }


    class Bubble {
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

            if (p.dist(this.x , this.y , p.mouseX  ,p.mouseY) < 20) {
                this.x = 0;
                this.y = 0;
            }

			this.vx = p.cos(this.heading);
			this.vy = p.sin(this.heading);

			this.x = (this.x + this.vx) % p.width;
			this.y = (this.y + this.vy) % p.height;

			if (this.x <= 0 ){
				this.x = canvasSize;
			}
			if (this.y <= 0 ){
				this.y = canvasSize;
			}

			//console.log(this.x , this.y);

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
			p.ellipse(this.x%canvasSize, this.y%canvasSize, this.r*20, this.r*20);
		}
	}
}






new p5(sketch_thing);



