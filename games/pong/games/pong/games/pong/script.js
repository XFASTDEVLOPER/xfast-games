const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// اندازه واکنش‌گرا
function resize(){
  const w = Math.min(window.innerWidth * 0.95, 800);
  canvas.width = w;
  canvas.height = w * 0.625;
}
resize();
window.addEventListener('resize', resize);

let paddleW = 14;
let paddleH = 100;

let leftY = 150;
let rightY = 150;

let ballX = 200;
let ballY = 150;
let ballSize = 12;
let ballDX = 5;
let ballDY = 4;

// کنترل موبایل و موس
canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  leftY = e.clientY - rect.top - paddleH / 2;
});

canvas.addEventListener('touchmove', e => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  leftY = e.touches[0].clientY - rect.top - paddleH / 2;
}, { passive: false });

function drawRect(x,y,w,h,color){
  ctx.fillStyle = color;
  ctx.fillRect(x,y,w,h);
}

function drawBall(){
  ctx.fillStyle = '#00e5ff';
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI*2);
  ctx.fill();
}

function update(){
  // توپ
  ballX += ballDX;
  ballY += ballDY;

  // برخورد بالا و پایین
  if(ballY < ballSize || ballY > canvas.height - ballSize){
    ballDY *= -1;
  }

  // برخورد با راکت چپ
  if(ballX < paddleW + ballSize &&
     ballY > leftY &&
     ballY < leftY + paddleH){
    ballDX *= -1;
  }

  // هوش مصنوعی ساده
  rightY += (ballY - (rightY + paddleH/2)) * 0.08;

  // برخورد با راکت راست
  if(ballX > canvas.width - paddleW - ballSize &&
     ballY > rightY &&
     ballY < rightY + paddleH){
    ballDX *= -1;
  }

  // ریست
  if(ballX < 0 || ballX > canvas.width){
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballDX *= -1;
  }
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // خط وسط
  drawRect(canvas.width/2 - 2, 0, 4, canvas.height, '#333');

  // راکت‌ها
  drawRect(0, leftY, paddleW, paddleH, '#fff');
  drawRect(canvas.width - paddleW, rightY, paddleW, paddleH, '#fff');

  // توپ
  drawBall();
}

function gameLoop(){
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
