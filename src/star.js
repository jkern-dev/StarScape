import Ministar from "./ministar";
import util from './util';
import detectCollision from './collision';
export default class Star {
  constructor(game, x, y, radius, color){
    this.game = game;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.c = game.c;
    this.vel = {
      x: util.randomIntFromRange(-6,6),
      y: 5
    }
    this.friction = 0.7;
    this.shadowBlur = 30;
    this.gravity = 1;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
  }

  draw() {
    this.c.save();
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    this.c.fillStyle = this.color;
    this.c.shadowColor = '#E3EAEF';
    this.c.shadowBlur = this.shadowBlur;
    this.c.fill();
    this.c.closePath;
    this.c.restore();
  }

  update() {
    this.draw();
    // hit bottom of screen flip velocity
    if (this.y + this.radius + this.vel.y >= this.gameHeight - this.game.groundHeight) {
      this.vel.y = - this.vel.y  * this.friction;
      this.shatter();
    } else { 
      this.vel.y += this.gravity;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  shatter() {
    this.radius -= 3;
    this.shadowBlur = this.shadowBlur / 2;
    for (let i = 0; i < 8; i++) {
      this.game.miniStars.push(new Ministar(this.c, this.x, this.y, 2, this.game))
    }
  }
}