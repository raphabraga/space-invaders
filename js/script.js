const player = document.querySelector(".player-shooter");
const playArea = document.querySelector("#main-play-area");
const enemyUrls = [
  "./img/monster-1.png",
  "./img/monster-2.png",
  "./img/monster-3.png",
];
const instructions = document.querySelector(".game-instructions");
const startBtn = document.querySelector(".start-btn");
const moveStep = 20;
const shootStep = 20;
const enemyStep = 1;
function keyHandler(event) {
  switch (event.key) {
    case "ArrowUp":
      event.preventDefault();
      move("up");
      break;
    case "ArrowDown":
      event.preventDefault();
      move("down");
      break;
    case " ":
      event.preventDefault();
      shoot();
      break;
    default:
      break;
  }
}

function move(dir) {
  let posY = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
  if (dir == "up") {
    if (posY > moveStep) player.style.top = `${posY - moveStep}px`;
  } else {
    const screenYBoundary = parseInt(
      window.getComputedStyle(playArea).getPropertyValue("height")
    );
    const playerHeight = parseInt(
      window.getComputedStyle(player).getPropertyValue("height")
    );
    if (posY < screenYBoundary - moveStep - playerHeight)
      player.style.top = `${posY + moveStep}px`;
  }
}

function shoot() {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

function createLaserElement() {
  let posX = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
  let posY = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
  let playerWidth = parseInt(
    window.getComputedStyle(player).getPropertyValue("width")
  );
  let laser = document.createElement("img");
  laser.src = "./img/shoot.png";
  laser.classList.add("laser");
  laser.style.left = `${posX + playerWidth - 15}px`;
  laser.style.top = `${posY + 10}px`;
  return laser;
}

function moveLaser(laser) {
  const gameXBoundary = parseInt(
    window.getComputedStyle(playArea).getPropertyValue("width")
  );
  let laserInterval = setInterval(() => {
    let laserX = parseInt(laser.style.left);
    let laserWidth = parseInt(
      window.getComputedStyle(laser).getPropertyValue("width")
    );
    let enemies = document.querySelectorAll(".enemy");
    enemies.forEach((enemy) => {
      if (checkLaserEnemyColision(laser, enemy)) {
        enemy.src = "./img/explosion.png";
        enemy.classList.remove("enemy");
        enemy.classList.add("dead-enemy");
        laser.remove();
        clearInterval(laserInterval);
      }
    });

    if (laserX < gameXBoundary - laserWidth)
      laser.style.left = `${laserX + shootStep}px`;
    else {
      laser.remove();
      clearInterval(laserInterval);
    }
  }, 10);
}

function createEnemy() {
  const gameXBoundary = parseInt(
    window.getComputedStyle(playArea).getPropertyValue("width")
  );
  const gameYBoundary = parseInt(
    window.getComputedStyle(playArea).getPropertyValue("height")
  );
  let enemy = document.createElement("img");
  enemy.src = enemyUrls[Math.floor(Math.random() * 3)];
  enemy.classList.add("enemy");
  enemy.classList.add("enemy-transition");
  enemy.style.left = `${gameXBoundary - 100}px`;
  enemy.style.top = `${Math.floor(Math.random() * (gameYBoundary - 100))}px`;
  playArea.appendChild(enemy);
  moveEnemy(enemy);
}

function moveEnemy(enemy) {
  let playerWidth = parseInt(
    window.getComputedStyle(player).getPropertyValue("width")
  );
  let enemyMovement = setInterval(() => {
    let posX = parseInt(
      window.getComputedStyle(enemy).getPropertyValue("left")
    );
    enemy.style.left = `${posX - enemyStep}px`;
    if (parseInt(enemy.style.left) < 0) {
      if (Array.from(enemy.classList).includes("dead-enemy")) enemy.remove();
      else {
        gameOver();
      }
      clearInterval(enemyMovement);
    }
  }, 10);
}

function checkLaserEnemyColision(laser, enemy) {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let laserHeight = parseInt(
    window.getComputedStyle(laser).getPropertyValue("height")
  );
  let laserWidth = parseInt(
    window.getComputedStyle(laser).getPropertyValue("width")
  );
  let enemyHeight = parseInt(
    window.getComputedStyle(enemy).getPropertyValue("height")
  );
  let laserBottom = laserTop + laserHeight;
  let enemyTop = parseInt(enemy.style.top);
  let enemyLeft = parseInt(enemy.style.left);
  let enemyBottom = enemyTop + enemyHeight;

  if (
    laserBottom > enemyTop &&
    laserTop < enemyBottom &&
    laserLeft + laserWidth > enemyLeft
  )
    return true;
  else return false;
}

function startGame() {
  startBtn.style.display = "none";
  instructions.style.display = "none";
  window.addEventListener("keydown", keyHandler);
  monsterRespawn = setInterval(() => createEnemy(), 2000);
  player.style.display = "block";
}

function gameOver() {
  clearInterval(monsterRespawn);
  window.removeEventListener("keydown", keyHandler);
  document.querySelectorAll(".enemy").forEach((enemy) => enemy.remove());
  player.style.display = "none";
  startBtn.style.display = "block";
  instructions.style.display = "block";
  document.querySelectorAll(".laser").forEach((laser) => laser.remove());
  setTimeout(() => {
    player.style.display = "none";
    player.style.top = "250px";
    alert("Game Over");
    startBtn.style.display = "block";
    instructions.style.display = "block";
  }, 100);
}

startBtn.addEventListener("click", startGame);
