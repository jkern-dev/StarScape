import Star from './star';
import util from './util';
import Character from './character';
import InputHandler from './input';
import { detectCollision } from './collision';

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  OVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight, c) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.groundHeight = 45;
    this.stars = [];
    this.miniStars = [];
    this.backgroundStars = [];
    this.c = c;
    this.character = new Character(this);
    this.ticker = 0;
    this.spawn = 100;
    this.gameState = 2;
  }

  init() {
    // create the background fixed stars
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * this.gameWidth;
      const y = Math.random() * this.gameHeight;
      const radius = Math.random() * 3;
      this.backgroundStars.push(new Star(this, x, y, radius, "white"))
    }
    // draw the background of the game
    const backgroundGradient = this.c.createLinearGradient(0, 0, 0, this.gameHeight);
    backgroundGradient.addColorStop(0, '#171e26');
    backgroundGradient.addColorStop(1, '#3f586b');
    this.c.fillStyle = backgroundGradient;
    this.c.fillRect(0, 0, this.gameWidth, this.gameHeight) 

    this.backgroundStars.forEach(star => {
      star.draw();
    });

    this.createMountainRange(1, this.gameHeight - 350, '#384551')
    this.createMountainRange(2, this.gameHeight - 500, '#2B3843')
    this.createMountainRange(3, this.gameHeight - 550, '#26333E')

    // create a ground floor for character
    this.c.fillStyle = "#182028";
    this.c.fillRect(0, this.gameHeight - this.groundHeight, this.gameWidth, this.groundHeight);


    // create the character
    this.character.draw();
  };

  createMountainRange(mtnAmount, height, color) {
    for (let i = 0; i < mtnAmount; i++) {
      const mountainWidth = this.gameWidth / mtnAmount;
      this.c.beginPath();
      this.c.moveTo(i* mountainWidth, this.gameHeight);
      this.c.lineTo(i * mountainWidth + mountainWidth + 475, this.gameHeight);
      this.c.lineTo(i * mountainWidth + mountainWidth / 2, this.gameHeight - height);
      this.c.lineTo(i * mountainWidth - 575, this.gameHeight);
      this.c.fillStyle = color;
      this.c.fill();
      this.c.closePath();
    }
  }

  animate() {
    if (this.gameState === GAMESTATE.PAUSED) {return};
    this.gameState = GAMESTATE.RUNNING;
    const backgroundGradient = this.c.createLinearGradient(0, 0, 0, this.gameHeight);
    backgroundGradient.addColorStop(0, '#171e26');
    backgroundGradient.addColorStop(1, '#3f586b');
    this.c.fillStyle = backgroundGradient;
    this.c.fillRect(0,0, this.gameWidth, this.gameHeight) 

    // initially draw the background stars 
    this.backgroundStars.forEach(star => {
      star.draw();
    });
    

    // create 3 mountain ranges 
    this.createMountainRange(1, this.gameHeight - 350, '#384551')
    this.createMountainRange(2, this.gameHeight - 500, '#2B3843')
    this.createMountainRange(3, this.gameHeight - 550, '#26333E')
    // create a ground floor 
    this.c.fillStyle = "#182028";
    this.c.fillRect(0, this.gameHeight - this.groundHeight, this.gameWidth, this.groundHeight);

    // continue to update the stars that will fall
    this.stars.forEach((star, index) => {
      star.update();
      if (detectCollision(star, this.character)) {
        this.stars.splice(index,1);
      };
      if (star.radius <= 0) {
        star.shatter();
        this.stars.splice(index, 1);
      };
      // destroy stars that go off screen
      if (star.x <= 0 || star.x + star.radius >= this.gameWidth) {
        star.shatter();
        this.stars.splice(index,1);
      };
    });

    // update the mini stars that appear on star shattering
    this.miniStars.forEach((mini, index) => {
      mini.update();
      if (mini.ttl === 0) {
        this.miniStars.splice(index, 1);
      }
    });

    this.ticker ++
    // randomize when a new star is spawned and falls from the sky
    if (this.ticker % this.spawn == 0) {
      const radius = 20;
      // make sure always generating star in range of canvas width
      const x = Math.max(radius, Math.random() * this.gameWidth - radius);
      this.stars.push(new Star(this, x, -100, 20, '#E3EAEF'))
      this.spawn = util.randomIntFromRange(50,200);
    }

    // place a display of lives remaining
    this.c.textAlign = "end";
    this.c.font = "20px Codystar";
    this.c.textAlign = "end";
    this.c.fillStyle = "#cccccc";
    this.c.fillText(`Lives Remaining:  ${this.character.lives}`, 685, 25);
    this.c.fillText(`Score: ${this.ticker}`, 685, 50);

    this.character.update();
    this.gameOver();
    new InputHandler(this);
  };

  togglePause() {
    let pauseWindow = document.getElementById("paused");
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
      pauseWindow.style.display = "none";
    } else {
      this.gameState = GAMESTATE.PAUSED;
      pauseWindow.style.display = "flex";
    }
  }

  gameOver() {
    let startText = document.getElementById("start");
    let gameOver = document.getElementById("over");
    let overImage = document.getElementById("over-image");

    if (this.gameState === GAMESTATE.RUNNING) {
      startText.style.display = "none";
    }
    if (this.character.lives === 0) {
      this.gameState = GAMESTATE.PAUSED;
      const t = document.createTextNode(`final score: ${this.ticker}`);
      const score = document.createElement("P");
      score.appendChild(t);
      gameOver.appendChild(score);
      gameOver.style.display = "flex";
      gameOver.style.flexDirection = "column";
      overImage.style.display = "flex";
      startText.style.display = "none";
    }
  }
}