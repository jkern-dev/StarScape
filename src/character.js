export default class Character {
  constructor(game) {
    this.c = game.c;
    this.x = game.gameWidth / 2;
    this.vel = 0;
    this.maxVel = 15;
    this.height = 40;
    this.width = 80;
    this.lives = 3;
    this.y = game.gameWidth - game.groundHeight - this.height;
    this.color = "blue";
    this.game = game;
  }

  moveLeft() {
    this.vel = -this.maxVel;
  }

  moveRight() {
    this.vel = this.maxVel
  }

  stop() {
    this.vel = 0;
  }

  draw() {
    this.c.fillStyle = this.color;
    this.c.fillRect(this.x,this.y,this.width,this.height);
  }

  update() {
    this.x += this.vel;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.game.gameWidth) {
      this.x = this.game.gameWidth - this.width
    }
    this.draw();
  }

}