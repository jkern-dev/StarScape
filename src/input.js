export default class InputHandler {
  constructor(character) {
    document.addEventListener("keydown", event => {
      switch(event.keyCode) {
        case 37:
          character.moveLeft();
          break;
        case 39:
          character.moveRight();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch(event.keyCode) {
        case 37:
          character.stop();
          break;
        case 39:
          character.stop()
          break;
      }
    });
  }
}