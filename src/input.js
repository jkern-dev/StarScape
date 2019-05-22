export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      switch(event.keyCode) {
        case 37:
          game.character.moveLeft();
          break;
        case 39:
          game.character.moveRight();
          break;
        // case 16:
        //   game.togglePause();
        //   break;
      }
    });

    document.addEventListener("keyup", event => {
      switch(event.keyCode) {
        case 37:
          game.character.stop();
          break;
        case 39:
          game.character.stop()
          break;
      }
    });
  }
}