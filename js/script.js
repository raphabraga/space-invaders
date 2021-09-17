const player = document.querySelector(".player-shooter");
const playArea = document.querySelector("#main-play-area");
const moveStep = 20;
const shootStep = 20;
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
  let laser = document.createElement("img");
  laser.src = "./img/shoot.png";
  laser.classList.add("laser");
  laser.style.left = `${posX}px`;
  laser.style.top = `${posY - 10}px`;
  return laser;
}

function moveLaser(laser) {
  const gameXBoundary = parseInt(
    window.getComputedStyle(playArea).getPropertyValue("width")
  );
  let laserInterval = setInterval(() => {
    let posX = parseInt(laser.style.left);
    if (posX < gameXBoundary - shootStep)
      laser.style.left = `${posX + shootStep}px`;
    else playArea.removeChild(laser);
    clearInterval(moveLaser);
  }, 10);
}

window.addEventListener("keydown", keyHandler);
