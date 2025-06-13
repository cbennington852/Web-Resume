// Globals
Mold[] molds;
int moldNum = 10000;
int canvasSize = 500;
float moldColor = 150;
float ringDensity = 500;
PFont font;
PGraphics pg;

void setup() {
  size(canvasSize, canvasSize);
  background(0);
  angleMode(DEGREES);
  smooth();
  

  // Spawn molds in a circle
  molds = new Mold[moldNum];
  float centerX = canvasSize / 2;
  float centerY = canvasSize / 2;
  float radius = 120;

  for (int i = 0; i < moldNum; i++) {
    float angle = (i / (float)moldNum) * TWO_PI;
    float x = centerX + radius * cos(angle);
    float y = centerY + radius * sin(angle);
    molds[i] = new Mold(x, y, canvasSize, color(moldColor), ringDensity);
  }
}

void draw() {
  loadPixels();
  fill(0, 5);
  noStroke();
  rect(0, 0, width, height);

  for (int i = 0; i < moldNum; i++) {
    molds[i].display();
    molds[i].update();
  }
}

void mousePressed() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    println("Mouse clicked at: " + mouseX + ", " + mouseY);
    fill(255, 0, 0);
    ellipse(mouseX, mouseY, 200, 200);
  }
}


class Mold {
  float x, y;
  float vx, vy;
  float r = 0.5;
  float heading;
  float rotAngle = radians(45);

  float sensorAngle = radians(45);
  float sensorDist = 10;
  float colorF = 0;
  float colorR = 0;
  float colorL = 0;

  PVector rSensorPos, fSensorPos, lSensorPos;

  color moldColor;
  float ringDensity;
  float canvasSize;

  Mold(float startingPosX, float startingPosY, float canvasSize, color moldColor, float ringDensity) {
    this.x = startingPosX;
    this.y = startingPosY;
    this.canvasSize = canvasSize;
    this.moldColor = moldColor;
    this.ringDensity = ringDensity;

    heading = radians(random(360));
    vx = cos(heading);
    vy = sin(heading);

    rSensorPos = new PVector(0, 0);
    fSensorPos = new PVector(0, 0);
    lSensorPos = new PVector(0, 0);
  }

  void update() {
    vx = cos(heading);
    vy = sin(heading);

    x = (x + vx + width) % width;
    y = (y + vy + height) % height;

    // Sensor positions
    rSensorPos.x = x + sensorDist * cos(heading + sensorAngle);
    rSensorPos.y = y + sensorDist * sin(heading + sensorAngle);

    lSensorPos.x = x + sensorDist * cos(heading - sensorAngle);
    lSensorPos.y = y + sensorDist * sin(heading - sensorAngle);

    fSensorPos.x = x + sensorDist * vx;
    fSensorPos.y = y + sensorDist * vy;

    loadPixels();
    int r = getPixelValue(rSensorPos.x, rSensorPos.y);
    int f = getPixelValue(fSensorPos.x, fSensorPos.y);
    int l = getPixelValue(lSensorPos.x, lSensorPos.y);

    float xCenter = width / 2f;
    float yCenter = height / 2f;

    // Custom coloring logic
    colorF = ((r * l * red(moldColor)) % 255);
    colorR = (r + red(moldColor)) % 255;
    colorL = getDistance(x, y, xCenter, yCenter) % ringDensity;

    // Direction logic
    if ((f > l) && (f > r)) {
      heading += 0;
    } else if (f < l && f < r) {
      if (random(1) < 0.5) {
        heading += rotAngle;
      } else {
        heading -= rotAngle;
      }
    } else if (l > r) {
      heading -= rotAngle;
    } else if (r > l) {
      heading += rotAngle;
    }
  }

  void display() {
    noStroke();
    fill(color(colorL, colorF, colorR));
    ellipse(x % canvasSize, y % canvasSize, r * 2, r * 2);
  }

  int getPixelValue(float px, float py) {
    int ix = constrain(floor(px), 0, width - 1);
    int iy = constrain(floor(py), 0, height - 1);
    int index = iy * width + ix;
    return pixels[index];
  }

  float getDistance(float x1, float y1, float x2, float y2) {
    float dx = x2 - x1;
    float dy = y2 - y1;
    return sqrt(dx * dx + dy * dy);
  }
}
