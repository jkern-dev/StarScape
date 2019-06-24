import Game from './game';

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("game-canvas");
  const c = canvas.getContext("2d");
  const GAME_WIDTH = 700;
  const GAME_HEIGHT = 700;
  const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    OVER: 3
  };
  let game = new Game(GAME_WIDTH, GAME_HEIGHT, c);
  game.init();
  let lastTime = 0;
  

  document.addEventListener("keydown", event => {
    switch(event.keyCode) {
      case 13:
        if (game.gameState === GAMESTATE.RUNNING) break;
        start();
        break;
    }
  })

  function gameLoop(timeStamp) {
    let deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    c.clearRect(0,0,GAME_WIDTH, GAME_HEIGHT);
    game.animate();
    requestAnimationFrame(gameLoop);
  } 

  function start() {
    requestAnimationFrame(gameLoop);
  }
})
