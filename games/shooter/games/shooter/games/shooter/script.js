const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = {
    x: 180,
    y: 620,
    width: 40,
    height: 50,
    speed: 7,
    lives: 3
};

let bullets = [];
let enemies = [];
let score = 0;
let gameOver = false;

const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;

    if ((e.key === " " || e.key === "ArrowUp") && !gameOver) {
        bullets.push({
            x: player.x + player.width / 2 - 2,
            y: player.y,
            width: 4,
            height: 12,
            speed: 10
        });
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

// کنترل لمسی موبایل
canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    player.x =
        (e.touches[0].clientX - rect.left) *
        (canvas.width / rect.width) -
        player.width / 2;

    bullets.push({
        x: player.x + player.width / 2 - 2,
        y: player.y,
        width: 4,
        height: 12,
        speed: 10
    });

}, { passive: false });

canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();

    const rect = canvas.getBoundingClientRect();

    player.x =
        (e.touches[0].clientX - rect.left) *
        (canvas.width / rect.width) -
        player.width / 2;

}, { passive: false });

function updatePlayer() {

    if (keys["ArrowLeft"])
        player.x -= player.speed;

    if (keys["ArrowRight"])
        player.x += player.speed;

    if (player.x < 0)
        player.x = 0;

    if (player.x > canvas.width - player.width)
        player.x = canvas.width - player.width;

}

function drawPlayer() {

    ctx.fillStyle = "#00e5ff";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );

}

function updateBullets() {

    for (let i = bullets.length - 1; i >= 0; i--) {

        bullets[i].y -= bullets[i].speed;

        if (bullets[i].y < -20) {
            bullets.splice(i, 1);
        }

    }

}

function drawBullets() {

    ctx.fillStyle = "yellow";

    bullets.forEach(b => {

        ctx.fillRect(
            b.x,
            b.y,
            b.width,
            b.height
        );

    });

}
function spawnEnemy() {

    enemies.push({

        x: Math.random() * (canvas.width - 40),

        y: -60,

        width: 40,

        height: 40,

        speed: 2 + Math.random() * 2

    });

}

setInterval(() => {

    if (!gameOver) {

        spawnEnemy();

    }

}, 900);

function updateEnemies() {

    for (let i = enemies.length - 1; i >= 0; i--) {

        const enemy = enemies[i];

        enemy.y += enemy.speed;

        // برخورد گلوله با دشمن
        for (let j = bullets.length - 1; j >= 0; j--) {

            const bullet = bullets[j];

            if (

                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y

            ) {

                bullets.splice(j,1);

                enemies.splice(i,1);

                score++;

                break;

            }

        }

        // برخورد دشمن با بازیکن
        if (

            enemy &&
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y

        ) {

            enemies.splice(i,1);

            player.lives--;

            if(player.lives <= 0){

                gameOver = true;

            }

        }

        // رد شدن دشمن
        if(enemy && enemy.y > canvas.height){

            enemies.splice(i,1);

            player.lives--;

            if(player.lives <= 0){

                gameOver = true;

            }

        }

    }

}

function drawEnemies(){

    ctx.fillStyle="red";

    enemies.forEach(enemy=>{

        ctx.fillRect(

            enemy.x,

            enemy.y,

            enemy.width,

            enemy.height

        );

    });

}

function drawHUD(){

    ctx.fillStyle="white";

    ctx.font="22px Arial";

    ctx.fillText("Score: "+score,10,30);

    ctx.fillText("Lives: "+player.lives,280,30);

}
function drawGameOver() {
    ctx.fillStyle = "rgba(0,0,0,0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "36px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2, 250);

    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, canvas.width / 2, 300);

    ctx.font = "18px Arial";
    ctx.fillText("Tap or Press R to Restart", canvas.width / 2, 340);
}

function restartGame() {
    bullets = [];
    enemies = [];
    score = 0;
    player.lives = 3;
    player.x = 180;
    gameOver = false;
}

document.addEventListener("keydown", (e) => {
    if (gameOver && (e.key === "r" || e.key === "R")) {
        restartGame();
    }
});

canvas.addEventListener("touchstart", () => {
    if (gameOver) {
        restartGame();
    }
});

function gameLoop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        drawGameOver();
        requestAnimationFrame(gameLoop);
        return;
    }

    updatePlayer();
    updateBullets();
    updateEnemies();

    drawPlayer();
    drawBullets();
    drawEnemies();
    drawHUD();

    requestAnimationFrame(gameLoop);
}

gameLoop();
