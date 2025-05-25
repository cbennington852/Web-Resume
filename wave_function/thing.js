class Thing {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  move() {
    let dx = Math.floor(getRandomNumber(-5, 5));
    let dy = Math.floor(getRandomNumber(-5, 5));

    let newX = (this.x + dx + 800) % 800;
    let newY = (this.y + dy + 800) % 800;

    // Check all pixels inside the 10x10 square at (newX, newY)
    let safe = true;
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        let c = get(newX + i, newY + j);
        if (c[0] === 0 && c[1] === 0 && c[2] === 0 && c[3] >= 100) {
          safe = false; // black pixel found
          break;
        }
      }
      if (!safe) break;
    }

    if (safe) {
      this.x = newX;
      this.y = newY;
    }
    // else: don't move
  }

  display() {
    fill('darkblue');
    square(this.x, this.y, this.size);
  }
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
