let size = 400; // Number of points
let precomputedHashes = [];

function setup() {
    createCanvas(400, 400);
    background(220);

    // Precompute hashes
    computeHashes();
}

async function computeHashes() {
    for (let n = 0; n < size; n++) {
        let hashValue = await sha256("" + n + "");
        precomputedHashes.push(Number(hashValue) % height); // Store precomputed values
    }
}

function draw() {
    background(220);

    // Draw points using precomputed hashes
    for (let n = 0; n < precomputedHashes.length; n++) {
        point(n, precomputedHashes[n]);

        if (n != precomputedHashes.length) {
            stroke('black');
            strokeWeight(1);
            line(n,precomputedHashes[n], (n+1), precomputedHashes[(n+1)]);
        }

    }

    stroke('magenta');
    strokeWeight(1);
    line(0,width, height, 0);
}

async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(10).padStart(2, '0')).join('');
    return hashHex;
}

sha256('Hello World').then(hash => console.log(hash)); // Outputs: a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e