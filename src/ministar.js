import util from './util';
export default class Ministar {
  constructor(c, x, y, radius, game) {
    // Star.call(this, x,y,radius)
    this.vel = {
      x: util.randomIntFromRange(-5,5),
      y: util.randomIntFromRange(-12,12)
    };
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.friction = 0.8;
    this.gravity = 0.2;
    this.ttl = 100;
    this.opacity = 1;
    this.c = c;
    this.game = game;
  }

  draw() {
    this.c.save();
    this.c.beginPath();
    this.c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    this.c.fillStyle = `rgba(227, 234, 239, ${this.opacity})`
    this.c.shadowColor = '#E3EAEF';
    this.c.shadowBlur = 20;
    this.c.fill();
    this.c.closePath();
    this.c.restore();
  }

  update() {
    this.draw();
    if (this.y + this.radius + this.vel.y > this.game.gameHeight) {
      this.vel.y = -this.vel.y * this.friction;
    } else {
      this.vel.y += this.gravity;
    }
    this.y += this.vel.y;
    this.x += this.vel.x;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;
  }
}