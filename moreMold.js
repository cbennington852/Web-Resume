class mold {
    constructor (startingPosX,startingPosY, canvasSize , moldColor, ringDensity) {
        this.x = startingPosX;
        this.y = startingPosY;
        this.r = 0.5;
        this.color = moldColor;
        this.ringDensity = ringDensity;

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

        //get distance to other mold, and do stuff?
        //or get distance from center
        let xCenter = width / 2;
        let yCenter = height / 2;
        //distance from another mold.
        this.colorF = (r *  l* this.color)%255;
        this.colorR = (r + this.color)%255;
        //distance from center
        this.colorL = (getDistance(this.x,this.y, xCenter, yCenter) % this.ringDensity);

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
    }
}

function getDistance(x1, y1, x2, y2) {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}