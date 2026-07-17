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

let isPaused = false;

let vignette;

function drawScanlines() {
  noStroke();
  fill(0, 0, 0, 60); // black, semi-transparent
  for (let y = 0; y < height; y += 4) {
    rect(0, y, width, 2);
  }
}

function drawFlicker() {
  let flickerAmount = random(0, 15);
  fill(255, 255, 255, flickerAmount);
  rect(0, 0, width, height);
}

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

  vignette = createGraphics(width, height);
  let ctx = vignette.drawingContext;
  let gradient = ctx.createRadialGradient(
    width / 2, height / 2, height / 4,   // inner circle
    width / 2, height / 2, width / 1.2   // outer circle
  );
  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;
  }
}

function draw() {
  background(0);
  fill(255);
  textSize(50);
  fill('#0f0');
  text(p1.score, width/2 + 150, 50);
  text(p2.score, width/2 - 200, 50);

  if (!isPaused) {
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

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    textAlign(CENTER, CENTER);
    textFont('Courier New');
    textSize(20);
    fill('#0f0');
    text("Press SPACE to pause game", width/2, height - 50);
  }

  // Draw both paddles
  fill('#0f0');
  rect(p1.x, p1.y, p1.width, p1.height);
  rect(p2.x, p2.y, p2.width, p2.height);

  // Draw ball
  fill('#0f0');
  circle(ball.x, ball.y, ball.size);

  // Paused overlay
    if (isPaused) {
      textAlign(CENTER, CENTER);
      textFont('Courier New');
      fill('#0f0');

      textSize(48);
      text("PAUSED", width / 2, height / 2);

      textSize(20);
      text("press SPACE to resume game", width / 2, height / 2 + 50);
    }

  // CRT overlay effects (draw last, on top of everything)
  drawScanlines();
  drawFlicker();
  image(vignette, 0, 0);
}