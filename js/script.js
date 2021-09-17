const player = document.querySelector(".player-shooter");
const playArea = document.querySelector("#main-play-area");
const moveStep = 20;
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
  let posY = parseInt(
    window.getComputedStyle(player).getPropertyValue("top").slice(0, -2)
  );
  if (dir == "up") {
    if (posY > moveStep) player.style.top = `${posY - moveStep}px`;
  } else {
    const screenYBoundary = window
      .getComputedStyle(playArea)
      .getPropertyValue("height")
      .slice(0, -2);
    const playerHeight = window
      .getComputedStyle(player)
      .getPropertyValue("height")
      .slice(0, -2);
    if (posY < screenYBoundary - moveStep - playerHeight)
      player.style.top = `${posY + moveStep}px`;
  }
}

function moveDown() {
  console.log("moving down");
}

function shoot() {
  console.log("shooting");
}

window.addEventListener("keydown", keyHandler);
