let p1 = {
  x: 20,
  y: 0,
  width: 10,
  height: 80,
  speed: 6
};

let p2 = {
  x: 0, // set in setup once we know canvas width
  y: 0,
  width: 10,
  height: 80,
  speed: 6
};

function setup() {
  createCanvas(1280, 720);

  p1.y = height / 2 - p1.height / 2;

  p1.x = width - 30;
  p1.y = height / 2 - p1.height / 2;

  p2.x = 20;
  p2.y = height / 2 - p2.height / 2;
}

function draw() {
  background(0);

  // Player 1: Arrow keys
  if (keyIsDown(UP_ARROW)) {
    p1.y -= p1.speed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    p1.y += p1.speed;
  }

  // Keep both paddles in bounds
  p1.y = constrain(p1.y, 0, height - p1.height);
  p2.y = constrain(p2.y, 0, height - p2.height);

  // Draw both paddles
  fill(255);
  rect(p1.x, p1.y, p1.width, p1.height);
  rect(p2.x, p2.y, p2.width, p2.height);
}