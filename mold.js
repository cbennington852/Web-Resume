class mold {
    constructor (startingPosX,startingPosY, canvasSize , moldColor) {
        this.x = startingPosX;
        this.y = startingPosY;
        this.r = 0.5;
        this.color = moldColor;

        this.heading = random(360);
        this.vx = cos(this.heading);
        this.vy = sin(this.heading);
        this.rotAngle = 45;

        this.rSensorPos = createVector(0,0);
        this.fSensorPos = createVector(0,0);
        this.lSensorPos = createVector(0,0);
        this.sensorAngle = 45;
        this.sensorDist = 10;
        this.colorF = 0;
        this.colorR = 0;
        this.colorL = 0;

    }

    update () {

        this.vx = cos(this.heading);
        this.vy = sin(this.heading);

        this.x = (this.x + this.vx) % width;
        this.y = (this.y + this.vy) % height;

        this.rSensorPos.x = this.x + this.sensorDist*cos(this.heading + this.sensorAngle);
        this.rSensorPos.y = this.y + this.sensorDist*sin(this.heading + this.sensorAngle);

        this.lSensorPos.x = this.x + this.sensorDist*cos(this.heading - this.sensorAngle);
        this.lSensorPos.y = this.y + this.sensorDist*sin(this.heading - this.sensorAngle);

        this.fSensorPos.x = this.x + this.sensorDist*cos(this.heading);
        this.fSensorPos.y = this.y + this.sensorDist*sin(this.heading);

        let index, l, r,f;
        index = 4*(d * floor(this.rSensorPos.y)) * (d * width) + 4*(d * floor(this.rSensorPos.x));
        r = pixels[index];

        index = 4*(d * floor(this.fSensorPos.y)) * (d * width) + 4*(d * floor(this.fSensorPos.x));
        f = pixels[index];

        index = 4*(d * floor(this.lSensorPos.y)) * (d * width) + 4*(d * floor(this.lSensorPos.x));
        l = pixels[index];

        this.colorF = (f + this.color)%255;
        this.colorR = (r)%255;
        this.colorL = (l)%255 + 70;

        if ((f > l) && (f > r)) {
            this.heading += 0;
        }
        else if (f < l && f < r) {
            if (random(1) < 0.5) {
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
        noStroke();
        fill(this.colorL,this.colorF,this.colorR);
        ellipse(this.x%canvasSize, this.y%canvasSize, this.r*2, this.r*2);

        // line(this.x, this.y, this.x + this.r*3*this.vx, this.y + this.r*3*this.vy );
        // fill('red');
        // ellipse(this.rSensorPos.x, this.rSensorPos.y, this.r*3, this.r*3);
        // ellipse(this.fSensorPos.x, this.fSensorPos.y, this.r*3, this.r*3);
        // ellipse(this.lSensorPos.x, this.lSensorPos.y, this.r*3, this.r*3);
    }
}