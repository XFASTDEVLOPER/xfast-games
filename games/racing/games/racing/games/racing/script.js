const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const player = {
    x: 170,
    y: 600,
    width: 60,
    height: 90,
    speed: 6
};

const keys = {};

document.addEventListener("keydown", e => {
    keys[e.key] = true;
});

document.addEventListener("keyup", e => {
    keys[e.key] = false;
});

function drawRoad() {
    ctx.fillStyle = "#555";
    ctx.fillRect(100, 0, 200, canvas.height);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;

    for(let y = 0; y < canvas.height; y += 40){
        ctx.beginPath();
        ctx.moveTo(200, y);
        ctx.lineTo(200, y + 20);
        ctx.stroke();
    }
}

function drawPlayer(){
    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function update(){
    if(keys["ArrowLeft"])
        player.x -= player.speed;

    if(keys["ArrowRight"])
        player.x += player.speed;

    if(player.x < 100)
        player.x = 100;

    if(player.x > 240)
        player.x = 240;
}

function gameLoop(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawRoad();
    drawPlayer();
    update();

    requestAnimationFrame(gameLoop);

}

gameLoop();
// ماشین‌های دشمن
let enemies = [
    { x: 120, y: -150, width: 60, height: 90, speed: 5 },
    { x: 220, y: -350, width: 60, height: 90, speed: 4 }
];

let score = 0;

function drawEnemies() {
    ctx.fillStyle = "red";

    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

        enemy.y += enemy.speed;

        if (enemy.y > canvas.height) {
            enemy.y = -120;
            enemy.x = Math.random() > 0.5 ? 120 : 220;
            score++;
        }

        // برخورد
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            alert("💥 Game Over\nScore: " + score);
            location.reload();
        }
    });
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}
