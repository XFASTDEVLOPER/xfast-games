const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 4,
    dy: 4,
    r: 10
};

let paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 20,
    w: 100,
    h: 10
};

// کنترل با موس
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    paddle.x = (e.clientX - rect.left) * (canvas.width / rect.width) - paddle.w / 2;
});

// کنترل لمسی
canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    paddle.x = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width) - paddle.w / 2;
}, { passive: false });

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#00e5ff";
    ctx.fill();
}

function drawPaddle() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x < ball.r || ball.x > canvas.width - ball.r)
        ball.dx *= -1;

    if (ball.y < ball.r)
        ball.dy *= -1;

    if (
        ball.y + ball.r >= paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.w
    ) {
        ball.dy *= -1;
    }

    if (ball.y > canvas.height) {
        alert("Game Over");
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    update();

    requestAnimationFrame(loop);
}

loop();
