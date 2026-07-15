let p1 = {
  x: 20,
  y: 0,
  width: 10,
  height: 100,
  speed: 10,

  score: 0
};

let p2 = {
  x: 0, // set in setup once we know canvas width
  y: 0,
  width: 10,
  height: 100,
  speed: 8,
  score: 0
};

let ball = {
  x: 0,
  y: 0,
  size: 15,
  speedY: 5,
  speedX: 7,
};

function resetBall() {
  ball.x = width / 2;
  ball.y = height / 2;

  let angle = random(-PI / 4, PI / 4);
  let direction = random([-1, 1]);
  let speed = 7;

  ball.speedX = direction * speed * cos(angle);
  ball.speedY = speed * sin(angle);
}

function setup() {
  createCanvas(1280, 720);

  // Paddles
  p1.y = height / 2 - p1.height / 2; 

  p1.x = width - 30;
  p1.y = height / 2 - p1.height / 2;

  p2.x = 20;
  p2.y = height / 2 - p2.height / 2;

  // Ball
  ball.x = width / 2;
  ball.y = height / 2;
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

  // Constrain ball
    // Bounce off top and bottom walls
    if (ball.y <= 0 || ball.y >= height - ball.size) {
      ball.speedY *= -1;
    }

    //Bounce off of paddles
  if (
    ball.x - ball.size / 2 <= p2.x + p2.width &&
    ball.y >= p2.y &&
    ball.y <= p2.y + p2.height
  ) {
    ball.speedX *= -1;
  }

  if (
    ball.x + ball.size / 2 >= p1.x &&
    ball.y >= p1.y &&
    ball.y <= p1.y + p1.height
  ) {
    ball.speedX *= -1;
  }

  if (ball.x < 0) {
    p1.score += 1;
    resetBall();
  }
  else if (ball.x > width) {
    p2.score += 1;
    resetBall();
  }

  // Draw ball
  fill(255);
  circle(ball.x, ball.y, ball.size);
  ball.x += ball.speedX;
  ball.y += ball.speedY;
}