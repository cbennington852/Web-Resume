

let colsRose, rowsRose; let sizeRose = 20;
let threshold = 0.2; let t = 0;
let screenSize = 600;
let tiles = [];
let playerX = 0;
let playerY = 0;


function sketch1(p) {
    p.setup = function () {
        p.roseCanvas = p.createCanvas(screenSize, screenSize);
        p.roseCanvas.parent("canvas-roseCanvas"); // Attach to the div

        colsRose = screenSize / sizeRose;
        rowsRose = screenSize / sizeRose;
        p.textSize(sizeRose);
        p.textAlign(p.CENTER, p.CENTER);

        tiles = generateDungeon(colsRose+100, rowsRose+100, 80, 4, 8)
        console.log(tiles.map(row => JSON.stringify(row)).join('\n'));

        
    };

    p.draw = function () {
        p.background(0);
        //console.log(colsRose);
        for (let i=0; i<colsRose; i++) {
            for (let j=0; j<rowsRose; j++) {
                let x = sizeRose/2 + i*sizeRose;
                let y = sizeRose/2 + j*sizeRose;
                let d = p.dist(x, y, screenSize/2, screenSize/2);
                let k = 10;
                let dx = x - screenSize/2;
                let dy = y - screenSize/2;
                let angle = Math.atan2(dy, dx);

                let symbol;
                let c;
                playerX = Math.min(p.mouseX,0) ;
                playerY = Math.min(p.mouseY,0 );
                //console.log(i , j);
                let vx = (i+playerX) % tiles.length;
                let vy = (j+playerY) % tiles[i].length;
                console.log(vx , vy);
                if (tiles[vx][vy] == 1) {
                    symbol = ".";
                    c = p.color(255, 100);
                } else {
                    symbol = "X";
                    c = colorGradient(30);
                    
                }

                p.fill(c);
                p.text(symbol, x, y); // This line was missing!

            }
        }

        t -= 0.01;
    };

    function renderMap() {
        for (let i=0; i<colsRose; i++) {
            for (let j=0; j<rowsRose; j++) {
                let x = sizeRose/2 + i*sizeRose;
                let y = sizeRose/2 + j*sizeRose;
                let d = p.dist(x, y, screenSize/2, screenSize/2);
                let k = 10;
                let dx = x - screenSize/2;
                let dy = y - screenSize/2;
                let angle = Math.atan2(dy, dx);

                let symbol;
                let c;
                //console.log(i , j);
                if (tiles[i][j] == 1) {
                    symbol = ".";
                    c = p.color(255, 100);
                } else {
                    symbol = "X";
                    c = colorGradient(30);
                    
                }

                p.fill(c);
                p.text(symbol, x, y); 
            }
        }
    }
    

    function generateDungeon(width, height, roomCount, roomMinSize, roomMaxSize) {
        const map = Array.from({ length: height }, () => Array(width).fill(0));
        const rooms = [];

        function createRoom(x, y, w, h) {
            for (let i = y; i < y + h; i++) {
            for (let j = x; j < x + w; j++) {
                map[i][j] = 1; // mark walkable area
            }
            }
        }

        function roomsOverlap(r1, r2) {
            return (
            r1.x <= r2.x + r2.w &&
            r1.x + r1.w >= r2.x &&
            r1.y <= r2.y + r2.h &&
            r1.y + r1.h >= r2.y
            );
        }

        function center(room) {
            return {
            x: Math.floor(room.x + room.w / 2),
            y: Math.floor(room.y + room.h / 2)
            };
        }

        function createHTunnel(x1, x2, y) {
            for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            map[y][x] = 1;
            }
        }

        function createVTunnel(y1, y2, x) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
            map[y][x] = 1;
            }
        }

        for (let i = 0; i < roomCount; i++) {
            const w = Math.floor(Math.random() * (roomMaxSize - roomMinSize + 1)) + roomMinSize;
            const h = Math.floor(Math.random() * (roomMaxSize - roomMinSize + 1)) + roomMinSize;
            const x = Math.floor(Math.random() * (width - w - 1));
            const y = Math.floor(Math.random() * (height - h - 1));

            const newRoom = { x, y, w, h };

            // Check for overlap
            if (rooms.some(r => roomsOverlap(r, newRoom))) {
            i--; // Retry
            continue;
            }

            createRoom(x, y, w, h);

            const newCenter = center(newRoom);

            if (rooms.length > 0) {
            const prevCenter = center(rooms[rooms.length - 1]);

            if (Math.random() < 0.5) {
                createHTunnel(prevCenter.x, newCenter.x, prevCenter.y);
                createVTunnel(prevCenter.y, newCenter.y, newCenter.x);
            } else {
                createVTunnel(prevCenter.y, newCenter.y, prevCenter.x);
                createHTunnel(prevCenter.x, newCenter.x, newCenter.y);
            }
            }

            rooms.push(newRoom);
        }

        return map;
        }

    function colorGradient(d) {
        let colors = [p.color(252, 176, 69), p.color(p.mouseY, 58, p.mouseX)];

        let colorRadius = 120;
        let amt = d % colorRadius / colorRadius;

        return p.lerpColor(colors[0], colors[1], amt);
    }

    function getRandInt(min, max) {
        min = Math.ceil(min); // Ensure min is an integer, rounding up if necessary
        max = Math.floor(max); // Ensure max is an integer, rounding down if necessary
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Run first p5 instance
new p5(sketch1);







