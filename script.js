const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const scoreLeftEl = document.getElementById("score-left");
const scoreRightEl = document.getElementById("score-right");
const statusEl = document.getElementById("status");
const toggleAiButton = document.getElementById("toggle-ai");
const resetButton = document.getElementById("reset");

const field = {
  width: canvas.width,
  height: canvas.height,
  centerX: canvas.width / 2,
  centerY: canvas.height / 2,
};

const paddleSize = {
  width: 16,
  height: 90,
};

const ballSize = 14;

const leftPaddle = {
  x: 24,
  y: field.centerY - paddleSize.height / 2,
  speed: 6,
  score: 0,
  color: "#3b82f6",
};

const rightPaddle = {
  x: field.width - 24 - paddleSize.width,
  y: field.centerY - paddleSize.height / 2,
  speed: 6,
  score: 0,
  color: "#22c55e",
};

const ball = {
  x: field.centerX,
  y: field.centerY,
  speed: 6,
  velocityX: 0,
  velocityY: 0,
  color: "#f8fafc",
};

const keys = new Set();
let aiEnabled = false;
let isPaused = true;
let lastWinner = "left";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const resetPositions = () => {
  leftPaddle.y = field.centerY - paddleSize.height / 2;
  rightPaddle.y = field.centerY - paddleSize.height / 2;
  ball.x = field.centerX;
  ball.y = field.centerY;
  ball.velocityX = 0;
  ball.velocityY = 0;
  isPaused = true;
  statusEl.textContent = "Serve the ball with Space.";
};

const serveBall = () => {
  if (!isPaused) {
    return;
  }
  const direction = lastWinner === "left" ? 1 : -1;
  const angle = (Math.random() * Math.PI) / 3 - Math.PI / 6;
  ball.velocityX = Math.cos(angle) * ball.speed * direction;
  ball.velocityY = Math.sin(angle) * ball.speed;
  isPaused = false;
  statusEl.textContent = "";
};

const updateScores = () => {
  scoreLeftEl.textContent = leftPaddle.score;
  scoreRightEl.textContent = rightPaddle.score;
};

const handleScore = (winner) => {
  if (winner === "left") {
    leftPaddle.score += 1;
  } else {
    rightPaddle.score += 1;
  }
  lastWinner = winner;
  updateScores();
  statusEl.textContent = `${winner === "left" ? "Blue" : "Green"} scores! Press Space.`;
  resetPositions();
};

const movePaddle = (paddle, direction) => {
  paddle.y = clamp(
    paddle.y + direction * paddle.speed,
    0,
    field.height - paddleSize.height
  );
};

const updatePlayerInput = () => {
  if (keys.has("w")) {
    movePaddle(leftPaddle, -1);
  }
  if (keys.has("s")) {
    movePaddle(leftPaddle, 1);
  }

  if (!aiEnabled) {
    if (keys.has("ArrowUp")) {
      movePaddle(rightPaddle, -1);
    }
    if (keys.has("ArrowDown")) {
      movePaddle(rightPaddle, 1);
    }
  }
};

const updateAi = () => {
  if (!aiEnabled) {
    return;
  }
  const paddleCenter = rightPaddle.y + paddleSize.height / 2;
  const reaction = ball.y - paddleCenter;
  const direction = reaction > 12 ? 1 : reaction < -12 ? -1 : 0;
  movePaddle(rightPaddle, direction);
};

const collide = (paddle) => {
  return (
    ball.x < paddle.x + paddleSize.width &&
    ball.x + ballSize > paddle.x &&
    ball.y < paddle.y + paddleSize.height &&
    ball.y + ballSize > paddle.y
  );
};

const updateBall = () => {
  if (isPaused) {
    return;
  }

  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  if (ball.y <= 0 || ball.y + ballSize >= field.height) {
    ball.velocityY *= -1;
  }

  if (collide(leftPaddle) && ball.velocityX < 0) {
    const impact = (ball.y + ballSize / 2 - (leftPaddle.y + paddleSize.height / 2)) /
      (paddleSize.height / 2);
    ball.velocityX = Math.abs(ball.velocityX) + 0.4;
    ball.velocityY = impact * ball.speed * 1.4;
  }

  if (collide(rightPaddle) && ball.velocityX > 0) {
    const impact = (ball.y + ballSize / 2 - (rightPaddle.y + paddleSize.height / 2)) /
      (paddleSize.height / 2);
    ball.velocityX = -Math.abs(ball.velocityX) - 0.4;
    ball.velocityY = impact * ball.speed * 1.4;
  }

  if (ball.x + ballSize < 0) {
    handleScore("right");
  }
  if (ball.x > field.width) {
    handleScore("left");
  }
};

const drawNet = () => {
  ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 16]);
  ctx.beginPath();
  ctx.moveTo(field.centerX, 12);
  ctx.lineTo(field.centerX, field.height - 12);
  ctx.stroke();
  ctx.setLineDash([]);
};

const drawRect = (x, y, width, height, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const drawBall = () => {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x + ballSize / 2, ball.y + ballSize / 2, ballSize / 2, 0, Math.PI * 2);
  ctx.fill();
};

const draw = () => {
  ctx.clearRect(0, 0, field.width, field.height);

  drawNet();
  drawRect(leftPaddle.x, leftPaddle.y, paddleSize.width, paddleSize.height, leftPaddle.color);
  drawRect(rightPaddle.x, rightPaddle.y, paddleSize.width, paddleSize.height, rightPaddle.color);
  drawBall();
};

const loop = () => {
  updatePlayerInput();
  updateAi();
  updateBall();
  draw();
  requestAnimationFrame(loop);
};

window.addEventListener("keydown", (event) => {
  keys.add(event.key);
  if (event.key === " ") {
    serveBall();
  }
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key);
});

toggleAiButton.addEventListener("click", () => {
  aiEnabled = !aiEnabled;
  toggleAiButton.textContent = aiEnabled
    ? "Disable AI Opponent"
    : "Enable AI Opponent";
  statusEl.textContent = aiEnabled
    ? "AI is defending the green paddle. Press Space to serve."
    : "Two-player mode. Press Space to serve.";
});

resetButton.addEventListener("click", () => {
  leftPaddle.score = 0;
  rightPaddle.score = 0;
  updateScores();
  resetPositions();
});

resetPositions();
loop();
