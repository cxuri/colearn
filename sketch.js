




// JS CODE

// ======================
// GLOBAL STATE
// ======================

let isOnGround = false;
let flipRotation = 0;
let flips = 0;
let score = 0;

// ======================
// PLAYER
// ======================

let player = {
  x: 200,
  y: 200,
  radius: 15,
  velocityY: 0,
  angle: 0
};

let gravity = 0.6;
let jumpForce = -16;

// ======================
// TERRAIN
// ======================

let terrainOffset = 0;

// ======================
// SETUP & DRAW
// ======================

function setup() {
  createCanvas(800, 400);
  textFont('Arial');
}

function draw() {
  background(135, 206, 235);

  drawTerrain();
  drawPlayer();
  applyPhysics();
  drawHUD();
}

// ======================
// TERRAIN
// ======================

function drawTerrain() {
  fill(255);
  noStroke();

  beginShape();
  vertex(0, height);

  for (let x = 0; x < width; x++) {
    let y = noise((x + terrainOffset) * 0.01) * 200 + 200;
    vertex(x, y);
  }

  vertex(width, height);
  endShape(CLOSE);

  terrainOffset += 2;
}

// ======================
// PLAYER RENDER
// ======================

function drawPlayer() {
  push();

  translate(player.x, player.y);
  rotate(player.angle);

  // body
  fill(0);
  ellipse(0, 0, player.radius * 2, player.radius);

  // direction indicator
  stroke(255, 0, 0);
  strokeWeight(2);
  line(0, 0, player.radius, 0);
  noStroke();

  pop();
}

// ======================
// HELPER
// ======================

function angleDifference(a, b) {
  let diff = (a - b + PI) % TWO_PI - PI;
  return abs(diff);
}

// ======================
// PHYSICS + GAME LOGIC
// ======================

function applyPhysics() {
  // gravity
  player.velocityY += gravity;
  player.y += player.velocityY;

  let groundY = getGroundHeight(player.x);

  // ======================
  // GROUND COLLISION & FLIP LOGIC
  // ======================
  if (player.y + player.radius > groundY) {
    player.y = groundY - player.radius;
    player.velocityY = 0;
    isOnGround = true;

    let slopeAngle = getSlopeAngle(player.x);
    let landingDifference = angleDifference(player.angle, slopeAngle);

    if (landingDifference < 0.5) {
      // GOOD LANDING
      if (abs(flipRotation) >= TWO_PI) {
        flips = floor(abs(flipRotation) / TWO_PI);
        score += flips * 100;
        flipRotation = 0;
        flips = 0;
      }
    } else {
      // BAD LANDING
      score = max(0, score - 100);
      flipRotation = 0;
      flips = 0;
    }

    player.angle = slopeAngle;

  } else {
    // IN AIR
    isOnGround = false;

    let spinSpeed = 0.12;
    player.angle += spinSpeed;
    flipRotation += spinSpeed;
  }

  // ======================
  // GAME OVER: FALL OFF SCREEN
  // ======================
  if (player.y - player.radius > height) {
    resetGame();
  }
}

// ======================
// TERRAIN HELPERS
// ======================

function getGroundHeight(x) {
  return noise((x + terrainOffset) * 0.01) * 200 + 200;
}

function getSlopeAngle(x) {
  let front = getGroundHeight(x + 10);
  let back = getGroundHeight(x - 10);
  return atan2(front - back, 20);
}

// ======================
// INPUT
// ======================

function keyPressed() {
  if (key === ' ' && isOnGround) {
    player.velocityY = jumpForce;
  }
}

// ======================
// HUD
// ======================

function drawHUD() {
  fill(0);
  textSize(20);
  text("Score: " + score, 20, 30);
}

// ======================
// RESET GAME FUNCTION
// ======================

function resetGame() {
  player.x = 200;
  player.y = 200;
  player.velocityY = 0;
  player.angle = 0;
  flipRotation = 0;
  flips = 0;
  score = 0;
  terrainOffset = 0;
}

