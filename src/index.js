import Game from './game';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("game-canvas");
  const c = canvas.getContext("2d");
  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 800;
  let game = new Game(GAME_WIDTH, GAME_HEIGHT, c);
  // const backgroundGradient = c.createLinearGradient(0, 0, 0, GAME_HEIGHT);
  // backgroundGradient.addColorStop(0, '#171e26');
  // backgroundGradient.addColorStop(1, '#3f586b');
  game.init();
  let lastTime = 0;
  

  function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    c.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT);
    game.animate();
    requestAnimationFrame(gameLoop);
  }
  requestAnimationFrame(gameLoop);
})
